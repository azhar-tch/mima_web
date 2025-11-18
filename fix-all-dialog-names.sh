#!/bin/bash

APP_DIR="/home/user/mima_web/src/app"

fix_dialog_files() {
    local dir=$1
    local old_pattern=$2
    local new_pattern=$3
    local old_class=$4
    local new_class=$5

    if [ -d "$dir" ]; then
        cd "$dir"

        # Rename files
        for old_file in ${old_pattern}.component.*; do
            if [ -f "$old_file" ]; then
                new_file=$(echo "$old_file" | sed "s/${old_pattern}/${new_pattern}/")
                mv "$old_file" "$new_file" 2>/dev/null || true
            fi
        done

        # Fix content in all TypeScript and HTML files
        find . -maxdepth 1 \( -name "*.ts" -o -name "*.html" \) -type f | while read file; do
            sed -i "s/${old_pattern}/${new_pattern}/g" "$file"
            sed -i "s/${old_class}/${new_class}/g" "$file"
        done

        echo "  ✓ Fixed $dir"
    fi
}

echo "=== Fixing Dialog Names ==="

# Fix trainings
fix_dialog_files "$APP_DIR/trainings/edit-training-dialog" "edit-trainings-dialog" "edit-training-dialog" "EditTrainingsDialogComponent" "EditTrainingDialogComponent"
fix_dialog_files "$APP_DIR/trainings/training-details-dialog" "trainings-details-dialog" "training-details-dialog" "TrainingsDetailsDialogComponent" "TrainingDetailsDialogComponent"
fix_dialog_files "$APP_DIR/trainings/delete-training-confirmation" "delete-trainings-confirmation" "delete-training-confirmation" "DeleteTrainingsConfirmationComponent" "DeleteTrainingConfirmationComponent"

# Fix awards
fix_dialog_files "$APP_DIR/awards/add-award-dialog" "add-awards-dialog" "add-award-dialog" "AddAwardsDialogComponent" "AddAwardDialogComponent"
fix_dialog_files "$APP_DIR/awards/edit-award-dialog" "edit-awards-dialog" "edit-award-dialog" "EditAwardsDialogComponent" "EditAwardDialogComponent"
fix_dialog_files "$APP_DIR/awards/award-details-dialog" "awards-details-dialog" "award-details-dialog" "AwardsDetailsDialogComponent" "AwardDetailsDialogComponent"
fix_dialog_files "$APP_DIR/awards/delete-award-confirmation" "delete-awards-confirmation" "delete-award-confirmation" "DeleteAwardsConfirmationComponent" "DeleteAwardConfirmationComponent"

# Fix hr-functions
fix_dialog_files "$APP_DIR/hr-functions/edit-function-dialog" "edit-hr-functions-dialog" "edit-function-dialog" "EditHrFunctionsDialogComponent" "EditFunctionDialogComponent"
fix_dialog_files "$APP_DIR/hr-functions/function-details-dialog" "hr-functions-details-dialog" "function-details-dialog" "HrFunctionsDetailsDialogComponent" "FunctionDetailsDialogComponent"
fix_dialog_files "$APP_DIR/hr-functions/delete-function-confirmation" "delete-hr-functions-confirmation" "delete-function-confirmation" "DeleteHrFunctionsConfirmationComponent" "DeleteFunctionConfirmationComponent"

# Fix service-positions
fix_dialog_files "$APP_DIR/service-positions/add-service-position-dialog" "add-service-positions-dialog" "add-service-position-dialog" "AddServicePositionsDialogComponent" "AddServicePositionDialogComponent"
fix_dialog_files "$APP_DIR/service-positions/edit-service-position-dialog" "edit-service-positions-dialog" "edit-service-position-dialog" "EditServicePositionsDialogComponent" "EditServicePositionDialogComponent"
fix_dialog_files "$APP_DIR/service-positions/service-position-details-dialog" "service-positions-details-dialog" "service-position-details-dialog" "ServicePositionsDetailsDialogComponent" "ServicePositionDetailsDialogComponent"
fix_dialog_files "$APP_DIR/service-positions/delete-service-position-confirmation" "delete-service-positions-confirmation" "delete-service-position-confirmation" "DeleteServicePositionsConfirmationComponent" "DeleteServicePositionConfirmationComponent"

# Fix other-positions
fix_dialog_files "$APP_DIR/other-positions/add-other-position-dialog" "add-other-positions-dialog" "add-other-position-dialog" "AddOtherPositionsDialogComponent" "AddOtherPositionDialogComponent"
fix_dialog_files "$APP_DIR/other-positions/edit-other-position-dialog" "edit-other-positions-dialog" "edit-other-position-dialog" "EditOtherPositionsDialogComponent" "EditOtherPositionDialogComponent"
fix_dialog_files "$APP_DIR/other-positions/other-position-details-dialog" "other-positions-details-dialog" "other-position-details-dialog" "OtherPositionsDetailsDialogComponent" "OtherPositionDetailsDialogComponent"
fix_dialog_files "$APP_DIR/other-positions/delete-other-position-confirmation" "delete-other-positions-confirmation" "delete-other-position-confirmation" "DeleteOtherPositionsConfirmationComponent" "DeleteOtherPositionConfirmationComponent"

# Fix bml-companies
fix_dialog_files "$APP_DIR/bml-companies/add-bml-company-dialog" "add-bml-companies-dialog" "add-bml-company-dialog" "AddBmlCompaniesDialogComponent" "AddBmlCompanyDialogComponent"
fix_dialog_files "$APP_DIR/bml-companies/edit-bml-company-dialog" "edit-bml-companies-dialog" "edit-bml-company-dialog" "EditBmlCompaniesDialogComponent" "EditBmlCompanyDialogComponent"
fix_dialog_files "$APP_DIR/bml-companies/bml-company-details-dialog" "bml-companies-details-dialog" "bml-company-details-dialog" "BmlCompaniesDetailsDialogComponent" "BmlCompanyDetailsDialogComponent"
fix_dialog_files "$APP_DIR/bml-companies/delete-bml-company-confirmation" "delete-bml-companies-confirmation" "delete-bml-company-confirmation" "DeleteBmlCompaniesConfirmationComponent" "DeleteBmlCompanyConfirmationComponent"

echo ""
echo "✅ All dialog names fixed!"
