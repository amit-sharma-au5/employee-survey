let intialState = {
    employees : [],
    surveys : []
} 

function appReducer(state = intialState, action){
    let stateCopy = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        default:
            return stateCopy;
        case "get_data":
            stateCopy = JSON.parse(JSON.stringify(state));
            stateCopy.employees = action.payload.Employees;
            stateCopy.surveys = action.payload.Surveys;
            return stateCopy
    }
}

export default appReducer;
