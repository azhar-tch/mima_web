#!/bin/bash

APP_DIR="/home/user/mima_web/src/app"

update_component() {
    local comp=$1
    local pascal=$2
    local model=$3
    local request=$4
    local service=$5
    local display=$6
    local primary=$7
    local plural=$8

    echo "Updating component: $comp"

    # Read the hr-grades component as template
    local ts_content=$(cat "$APP_DIR/hr-grades/hr-grades.component.ts")
    local html_content=$(cat "$APP_DIR/hr-grades/hr-grades.component.html")

    # Replace in TypeScript file
    echo "$ts_content" | \
        sed -e "s/hr-grades/${comp}/g" \
            -e "s/HrGradesComponent/${pascal}Component/g" \
            -e "s/HRGrade/${model}/g" \
            -e "s/HRGradeRequest/${request}/g" \
            -e "s/HrGradesService/${service}/g" \
            -e "s/hr-grades/${comp}/g" \
            -e "s/Add-grade/Add-${comp%-*}/g" \
            -e "s/add-grade/add-${comp%-*}/g" \
            -e "s/Edit-grade/Edit-${comp%-*}/g" \
            -e "s/edit-grade/edit-${comp%-*}/g" \
            -e "s/-grade-/-${comp%-*}-/g" \
            -e "s/Grade/${pascal#*s}/g" \
            -e "s/grade/${comp%-*}/g" \
            -e "s/grades/${plural}/g" \
            -e "s/Grades/${pascal}/g" \
            -e "s/loadGrades/load${pascal}/g" \
            -e "s/filteredGrades/filtered${pascal}/g" \
            -e "s/handleAddGrade/handleAdd${pascal#*s}/g" \
            -e "s/handleEditGrade/handleEdit${pascal#*s}/g" \
            -e "s/handleDeleteGrade/handleDelete${pascal#*s}/g" \
            -e "s/selectedGrade/selected${pascal#*s}/g" \
            -e "s/openAddGradeDialog/openAdd${pascal#*s}Dialog/g" \
            -e "s/openEditGradeDialog/openEdit${pascal#*s}Dialog/g" \
            -e "s/openDeleteGradeDialog/openDelete${pascal#*s}Dialog/g" \
            -e "s/openGradeDetailsDialog/open${pascal#*s}DetailsDialog/g" \
        > "$APP_DIR/$comp/$comp.component.ts"

    # Replace in HTML file
    echo "$html_content" | \
        sed -e "s/Grades RH/${display}/g" \
            -e "s/grades hiérarchiques du personnel/${display,,}/g" \
            -e "s/Ajouter un grade/Ajouter ${display,,}/g" \
            -e "s/grade/${comp%-*}/g" \
            -e "s/Grade/${pascal#*s}/g" \
            -e "s/grades/${plural}/g" \
            -e "s/Grades/${pascal}/g" \
            -e "s/filteredGrades/filtered${pascal}/g" \
            -e "s/Aucun grade trouvé/Aucun élément trouvé/g" \
            -e "s/gradeName/${primary}/g" \
            -e "s/Nom du grade/Nom/g" \
            -e "s/open.*Dialog/open${pascal#*s}Dialog/g" \
        > "$APP_DIR/$comp/$comp.component.html"

    echo "  ✓ Updated $comp"
}

echo "=== Updating Component Files ==="

update_component "hr-functions" "HrFunctions" "HRFunction" "HRFunctionRequest" "HrFunctionsService" "Fonctions RH" "functionName" "functions"
update_component "trainings" "Trainings" "Training" "TrainingRequest" "TrainingsService" "Formations" "trainingName" "trainings"
update_component "awards" "Awards" "Award" "AwardRequest" "AwardsService" "Distinctions" "awardName" "awards"
update_component "service-positions" "ServicePositions" "ServicePosition" "ServicePositionRequest" "ServicePositionsService" "Postes de service" "positionName" "positions"
update_component "other-positions" "OtherPositions" "OtherPosition" "OtherPositionRequest" "OtherPositionsService" "Autres postes" "positionName" "positions"
update_component "bml-companies" "BmlCompanies" "BMLCompany" "BMLCompanyRequest" "BmlCompaniesService" "Compagnies BML" "companyName" "companies"

echo ""
echo "✅ All components updated!"
