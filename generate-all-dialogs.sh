#!/bin/bash

APP_DIR="/home/user/mima_web/src/app"
SOURCE_DIR="$APP_DIR/hr-grades"

# Function to copy and adapt dialogs from hr-grades to target component
generate_dialogs() {
    local component=$1
    local pascal_name=$2
    local model_name=$3
    local request_name=$4
    local display_name=$5
    local primary_field=$6
    local model_import=$7
    local service_name=$8

    echo "Generating dialogs for: $component"

    local target_dir="$APP_DIR/$component"

    # Create dialog directories
    mkdir -p "$target_dir/add-${component}-dialog"
    mkdir -p "$target_dir/edit-${component}-dialog"
    mkdir -p "$target_dir/${component}-details-dialog"
    mkdir -p "$target_dir/delete-${component}-confirmation"

    # Generate Add Dialog
    sed -e "s/add-grade-dialog/add-${component}-dialog/g" \
        -e "s/Add-grade-dialog/Add-${component}-dialog/g" \
        -e "s/AddGradeDialogComponent/Add${pascal_name}DialogComponent/g" \
        -e "s/HRGradeRequest/${request_name}/g" \
        -e "s/HRGrade/${model_name}/g" \
        -e "s/gradeName/${primary_field}/g" \
        -e "s/Le nom du grade/${display_name}/g" \
        -e "s/Ajouter un grade/Ajouter ${display_name}/g" \
        -e "s/Créez un nouveau grade RH/Créez ${display_name}/g" \
        "$SOURCE_DIR/add-grade-dialog/add-grade-dialog.component.ts" > "$target_dir/add-${component}-dialog/add-${component}-dialog.component.ts"

    cp "$SOURCE_DIR/add-grade-dialog/add-grade-dialog.component.html" "$target_dir/add-${component}-dialog/add-${component}-dialog.component.html"
    sed -i "s/add-grade-dialog/add-${component}-dialog/g" "$target_dir/add-${component}-dialog/add-${component}-dialog.component.html"
    sed -i "s/Ajouter un grade/Ajouter ${display_name}/g" "$target_dir/add-${component}-dialog/add-${component}-dialog.component.html"

    cp "$SOURCE_DIR/add-grade-dialog/add-grade-dialog.component.css" "$target_dir/add-${component}-dialog/add-${component}-dialog.component.css"

    sed -e "s/add-grade-dialog/add-${component}-dialog/g" \
        -e "s/AddGradeDialogComponent/Add${pascal_name}DialogComponent/g" \
        "$SOURCE_DIR/add-grade-dialog/add-grade-dialog.component.spec.ts" > "$target_dir/add-${component}-dialog/add-${component}-dialog.component.spec.ts"

    # Generate Edit Dialog
    sed -e "s/edit-grade-dialog/edit-${component}-dialog/g" \
        -e "s/EditGradeDialogComponent/Edit${pascal_name}DialogComponent/g" \
        -e "s/HRGradeRequest/${request_name}/g" \
        -e "s/HRGrade/${model_name}/g" \
        -e "s/gradeName/${primary_field}/g" \
        -e "s/grade/${component}/g" \
        "$SOURCE_DIR/edit-grade-dialog/edit-grade-dialog.component.ts" > "$target_dir/edit-${component}-dialog/edit-${component}-dialog.component.ts"

    cp "$SOURCE_DIR/edit-grade-dialog/edit-grade-dialog.component.html" "$target_dir/edit-${component}-dialog/edit-${component}-dialog.component.html"
    sed -i "s/edit-grade-dialog/edit-${component}-dialog/g" "$target_dir/edit-${component}-dialog/edit-${component}-dialog.component.html"
    sed -i "s/Modifier le grade/Modifier ${display_name}/g" "$target_dir/edit-${component}-dialog/edit-${component}-dialog.component.html"

    cp "$SOURCE_DIR/edit-grade-dialog/edit-grade-dialog.component.css" "$target_dir/edit-${component}-dialog/edit-${component}-dialog.component.css"

    sed -e "s/edit-grade-dialog/edit-${component}-dialog/g" \
        -e "s/EditGradeDialogComponent/Edit${pascal_name}DialogComponent/g" \
        "$SOURCE_DIR/edit-grade-dialog/edit-grade-dialog.component.spec.ts" > "$target_dir/edit-${component}-dialog/edit-${component}-dialog.component.spec.ts"

    # Generate Details Dialog
    sed -e "s/grade-details-dialog/${component}-details-dialog/g" \
        -e "s/GradeDetailsDialogComponent/${pascal_name}DetailsDialogComponent/g" \
        -e "s/HRGrade/${model_name}/g" \
        -e "s/grade/${component}/g" \
        "$SOURCE_DIR/grade-details-dialog/grade-details-dialog.component.ts" > "$target_dir/${component}-details-dialog/${component}-details-dialog.component.ts"

    cp "$SOURCE_DIR/grade-details-dialog/grade-details-dialog.component.html" "$target_dir/${component}-details-dialog/${component}-details-dialog.component.html"
    sed -i "s/grade-details-dialog/${component}-details-dialog/g" "$target_dir/${component}-details-dialog/${component}-details-dialog.component.html"
    sed -i "s/Détails du grade/Détails ${display_name}/g" "$target_dir/${component}-details-dialog/${component}-details-dialog.component.html"

    cp "$SOURCE_DIR/grade-details-dialog/grade-details-dialog.component.css" "$target_dir/${component}-details-dialog/${component}-details-dialog.component.css"

    sed -e "s/grade-details-dialog/${component}-details-dialog/g" \
        -e "s/GradeDetailsDialogComponent/${pascal_name}DetailsDialogComponent/g" \
        "$SOURCE_DIR/grade-details-dialog/grade-details-dialog.component.spec.ts" > "$target_dir/${component}-details-dialog/${component}-details-dialog.component.spec.ts"

    # Generate Delete Confirmation
    sed -e "s/delete-grade-confirmation/delete-${component}-confirmation/g" \
        -e "s/DeleteGradeConfirmationComponent/Delete${pascal_name}ConfirmationComponent/g" \
        -e "s/HRGrade/${model_name}/g" \
        -e "s/grade/${component}/g" \
        "$SOURCE_DIR/delete-grade-confirmation/delete-grade-confirmation.component.ts" > "$target_dir/delete-${component}-confirmation/delete-${component}-confirmation.component.ts"

    cp "$SOURCE_DIR/delete-grade-confirmation/delete-grade-confirmation.component.html" "$target_dir/delete-${component}-confirmation/delete-${component}-confirmation.component.html"
    sed -i "s/delete-grade-confirmation/delete-${component}-confirmation/g" "$target_dir/delete-${component}-confirmation/delete-${component}-confirmation.component.html"
    sed -i "s/grade/${component}/g" "$target_dir/delete-${component}-confirmation/delete-${component}-confirmation.component.html"

    cp "$SOURCE_DIR/delete-grade-confirmation/delete-grade-confirmation.component.css" "$target_dir/delete-${component}-confirmation/delete-${component}-confirmation.component.css"

    sed -e "s/delete-grade-confirmation/delete-${component}-confirmation/g" \
        -e "s/DeleteGradeConfirmationComponent/Delete${pascal_name}ConfirmationComponent/g" \
        "$SOURCE_DIR/delete-grade-confirmation/delete-grade-confirmation.component.spec.ts" > "$target_dir/delete-${component}-confirmation/delete-${component}-confirmation.component.spec.ts"

    echo "  ✓ Generated all 4 dialogs for $component"
}

# Generate dialogs for all HR components (similar to hr-grades)
echo "=== Generating HR Management Dialogs ==="

generate_dialogs "hr-functions" "HrFunction" "HRFunction" "HRFunctionRequest" "une fonction" "functionName" "../models/HRManagement" "HrFunctionsService"
generate_dialogs "trainings" "Training" "Training" "TrainingRequest" "une formation" "trainingName" "../models/HRManagement" "TrainingsService"
generate_dialogs "awards" "Award" "Award" "AwardRequest" "une distinction" "awardName" "../models/HRManagement" "AwardsService"
generate_dialogs "service-positions" "ServicePosition" "ServicePosition" "ServicePositionRequest" "un poste de service" "positionName" "../models/HRManagement" "ServicePositionsService"
generate_dialogs "other-positions" "OtherPosition" "OtherPosition" "OtherPositionRequest" "un autre poste" "positionName" "../models/HRManagement" "OtherPositionsService"
generate_dialogs "bml-companies" "BmlCompany" "BMLCompany" "BMLCompanyRequest" "une compagnie BML" "companyName" "../models/HRManagement" "BmlCompaniesService"

echo ""
echo "✅ All HR dialogs generated successfully!"
