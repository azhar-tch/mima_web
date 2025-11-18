#!/bin/bash

APP_DIR="/home/user/mima_web/src/app"

# Fix trainings imports
sed -i \
    -e "s/add-training-dialog\/add-training-dialog/add-training-dialog\/add-training-dialog/g" \
    -e "s/AddDialogComponent/AddTrainingDialogComponent/g" \
    -e "s/EditDialogComponent/EditTrainingDialogComponent/g" \
    -e "s/DetailsDialogComponent/TrainingDetailsDialogComponent/g" \
    -e "s/DeleteConfirmationComponent/DeleteTrainingConfirmationComponent/g" \
    -e "s/add-training-dialog/add-training-dialog/g" \
    -e "s/edit-training-dialog/edit-training-dialog/g" \
    -e "s/training-details-dialog/training-details-dialog/g" \
    -e "s/delete-training-confirmation/delete-training-confirmation/g" \
    "$APP_DIR/trainings/trainings.component.ts"

# Fix awards imports
sed -i \
    -e "s/AddDialogComponent/AddAwardDialogComponent/g" \
    -e "s/EditDialogComponent/EditAwardDialogComponent/g" \
    -e "s/DetailsDialogComponent/AwardDetailsDialogComponent/g" \
    -e "s/DeleteConfirmationComponent/DeleteAwardConfirmationComponent/g" \
    -e "s/'\.\/add-award-dialog\/add-award-dialog\.component'/'\.\/add-award-dialog\/add-award-dialog\.component'/g" \
    -e "s/'\.\/edit-award-dialog\/edit-award-dialog\.component'/'\.\/edit-award-dialog\/edit-award-dialog\.component'/g" \
    -e "s/'\.\/award-details-dialog\/award-details-dialog\.component'/'\.\/award-details-dialog\/award-details-dialog\.component'/g" \
    -e "s/'\.\/delete-award-confirmation\/delete-award-confirmation\.component'/'\.\/delete-award-confirmation\/delete-award-confirmation\.component'/g" \
    "$APP_DIR/awards/awards.component.ts"

# Fix service-positions imports
sed -i \
    -e "s/AddDialogComponent/AddServicePositionDialogComponent/g" \
    -e "s/EditDialogComponent/EditServicePositionDialogComponent/g" \
    -e "s/DetailsDialogComponent/ServicePositionDetailsDialogComponent/g" \
    -e "s/DeleteConfirmationComponent/DeleteServicePositionConfirmationComponent/g" \
    "$APP_DIR/service-positions/service-positions.component.ts"

# Fix other-positions imports
sed -i \
    -e "s/AddDialogComponent/AddOtherPositionDialogComponent/g" \
    -e "s/EditDialogComponent/EditOtherPositionDialogComponent/g" \
    -e "s/DetailsDialogComponent/OtherPositionDetailsDialogComponent/g" \
    -e "s/DeleteConfirmationComponent/DeleteOtherPositionConfirmationComponent/g" \
    "$APP_DIR/other-positions/other-positions.component.ts"

# Fix bml-companies imports
sed -i \
    -e "s/AddDialogComponent/AddBmlCompanyDialogComponent/g" \
    -e "s/EditDialogComponent/EditBmlCompanyDialogComponent/g" \
    -e "s/DetailsDialogComponent/BmlCompanyDetailsDialogComponent/g" \
    -e "s/DeleteConfirmationComponent/DeleteBmlCompanyConfirmationComponent/g" \
    "$APP_DIR/bml-companies/bml-companies.component.ts"

echo "✅ Imports fixed!"
