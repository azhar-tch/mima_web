#!/bin/bash

# Navigate to Angular project
cd /home/user/mima_web

# System 4 - HR Reference Data (7 entities)
echo "Creating HR Reference Data components..."
ng g c hr-grades --standalone --skip-tests
ng g c trainings --standalone --skip-tests
ng g c awards --standalone --skip-tests
ng g c hr-functions --standalone --skip-tests
ng g c service-positions --standalone --skip-tests
ng g c other-positions --standalone --skip-tests
ng g c bml-companies --standalone --skip-tests

# System 4 - Agent History (7 entities)
echo "Creating Agent History components..."
ng g c agent-grade-history --standalone --skip-tests
ng g c agent-training-history --standalone --skip-tests
ng g c agent-award-history --standalone --skip-tests
ng g c agent-function-history --standalone --skip-tests
ng g c agent-company-history --standalone --skip-tests
ng g c agent-service-position-history --standalone --skip-tests
ng g c agent-other-position-history --standalone --skip-tests

# System 3 - Maritime Operations (12 entities)
echo "Creating Maritime Operations components..."
ng g c commercial-ships --standalone --skip-tests
ng g c naval-vessels --standalone --skip-tests
ng g c security-agencies --standalone --skip-tests
ng g c armed-guard-missions --standalone --skip-tests
ng g c escort-missions --standalone --skip-tests
ng g c ship-arrival-departures --standalone --skip-tests
ng g c pal-entry-exits --standalone --skip-tests
ng g c ship-incidents --standalone --skip-tests
ng g c ship-provisionings --standalone --skip-tests
ng g c sts-operations --standalone --skip-tests
ng g c conservator-seizures --standalone --skip-tests
ng g c personnel-allowances --standalone --skip-tests

echo "✓ All 26 components created successfully!"
