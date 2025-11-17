#!/usr/bin/env python3
"""
Script pour convertir les composants React/shadcn en Angular
Usage: python convert-react-to-angular.py
"""

import os
import re
from pathlib import Path

def convert_typescript_file(filepath):
    """Convertit un fichier TypeScript React en Angular"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip if already converted
    if '@Component' in content and 'imports: [' in content:
        print(f"✓ Already converted: {filepath}")
        return False

    original = content

    # Remove "use client"
    content = re.sub(r'"use client"\s*\n', '', content)

    # Remove React imports
    content = re.sub(r'import.*from\s+["\']react["\'].*\n', '', content)
    content = re.sub(r'import\s+type\s+React\s+from\s+["\']react["\'].*\n', '', content)

    # Remove shadcn UI imports (we'll use native HTML)
    content = re.sub(r'import\s+\{[^}]+\}\s+from\s+["\']@/components/ui/[^"\']+["\'].*\n', '', content)

    # Add Angular imports at the top if not present
    if 'import { Component' not in content:
        angular_imports = """import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

"""
        content = angular_imports + content

    # Convert interface props to class properties
    # Example: interface AddUnitDialogProps { open: boolean; ... }
    props_match = re.search(r'interface\s+(\w+)Props\s*\{([^}]+)\}', content, re.DOTALL)
    if props_match:
        props_content = props_match.group(2)
        # Extract properties
        prop_lines = []
        for line in props_content.strip().split('\n'):
            line = line.strip()
            if line and not line.startswith('//') and not line.startswith('children'):
                # Convert: open: boolean -> @Input() open = false;
                match = re.match(r'(\w+):\s*(.+?)(?:;)?$', line)
                if match:
                    prop_name = match.group(1)
                    prop_type = match.group(2).strip()

                    if 'onOpenChange' in prop_name or 'on' in prop_name.lower():
                        # Convert callbacks to @Output
                        event_name = prop_name.replace('on', '').replace('OpenChange', 'Change')
                        event_name = event_name[0].lower() + event_name[1:]
                        prop_lines.append(f"  @Output() {event_name} = new EventEmitter<any>();")
                    else:
                        # Convert to @Input
                        default_val = 'false' if 'boolean' in prop_type else "''" if 'string' in prop_type else '0' if 'number' in prop_type else 'null'
                        prop_lines.append(f"  @Input() {prop_name} = {default_val};")

        # Remove the interface
        content = re.sub(r'interface\s+\w+Props\s*\{[^}]+\}', '', content, flags=re.DOTALL)

    # Convert function component to Angular Component
    # Example: export function AddUnitDialog({ ... }: AddUnitDialogProps) {
    component_match = re.search(r'export\s+function\s+(\w+)\s*\([^)]*\)\s*\{', content)
    if component_match:
        component_name = component_match.group(1)

        # Find the component body (everything between the function brackets)
        start = content.find('{', content.find('export function'))

        # Extract component logic (useState, handlers, etc.)
        component_body = content[start+1:]

        # Convert useState
        component_body = re.sub(
            r'const\s+\[(\w+),\s*set\w+\]\s*=\s*useState\(([^)]+)\)',
            r'\1 = \2;',
            component_body
        )

        # Convert handler functions to methods
        component_body = re.sub(
            r'const\s+(\w+)\s*=\s*\([^)]*\)\s*=>\s*\{',
            r'\1() {',
            component_body
        )

        # Create Angular component
        selector = re.sub(r'(?<!^)(?=[A-Z])', '-', component_name).lower()

        angular_component = f"""
@Component({{
  selector: 'app-{selector}',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './{selector}.component.html',
  styleUrl: './{selector}.component.css'
}})
export class {component_name}Component {{
{chr(10).join(prop_lines) if 'prop_lines' in locals() else ''}
{component_body}
"""

        content = re.sub(
            r'export\s+function\s+\w+\s*\([^)]*\)\s*\{.*',
            angular_component,
            content,
            flags=re.DOTALL
        )

    # Write back if changed
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✓ Converted: {filepath}")
        return True

    return False

def convert_html_file(filepath):
    """Convertit un template HTML React/JSX en Angular"""
    if not os.path.exists(filepath):
        return False

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Convert className to class
    content = re.sub(r'\bclassName=', 'class=', content)

    # Convert onClick to (click)
    content = re.sub(r'\bonClick=\{([^}]+)\}', r'(click)="\1"', content)

    # Convert onChange to [(ngModel)]
    content = re.sub(r'\bvalue=\{([^}]+)\}\s+onChange=\{[^}]+\}', r'[(ngModel)]="\1"', content)

    # Convert {variable} to {{variable}}
    content = re.sub(r'\{(\w+)\}', r'{{\1}}', content)

    # Convert conditional rendering {condition && <element>} to *ngIf
    content = re.sub(r'\{([^}]+)\s*&&\s*\(?\s*<', r'<div *ngIf="\1">', content)

    # Convert map to *ngFor
    content = re.sub(
        r'\{(\w+)\.map\(\((\w+)\)\s*=>\s*\(',
        r'<ng-container *ngFor="let \2 of \1">',
        content
    )

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✓ Converted HTML: {filepath}")
        return True

    return False

def main():
    """Main conversion function"""
    print("🔄 Converting React components to Angular...\n")

    base_path = Path("src/app")
    components = [
        'units', 'missions', 'guards', 'absences',
        'alerts', 'rules', 'notifications'
    ]

    total_converted = 0

    for component_dir in components:
        component_path = base_path / component_dir
        if component_path.exists():
            print(f"\n📁 Processing {component_dir}...")

            # Find all TypeScript files
            for ts_file in component_path.rglob("*.component.ts"):
                if convert_typescript_file(ts_file):
                    total_converted += 1

                # Try to convert corresponding HTML
                html_file = ts_file.with_suffix('.html')
                convert_html_file(html_file)

    print(f"\n✅ Conversion complete! {total_converted} files converted.")
    print("\n📝 Next steps:")
    print("1. Review the converted files")
    print("2. Add missing @Input/@Output decorators manually if needed")
    print("3. Test each component")
    print("4. Fix any remaining TypeScript errors")

if __name__ == "__main__":
    main()
