import { IdeasAction, IdeaType, DispatchIdeasType } from "../../model/AppTypes";
import { ADD_IDEAS, GET_IDEAS } from "../actionTypes";

export async function addIdeas(ideas: IdeaType[]){
    const action: IdeasAction = {
        type: ADD_IDEAS,
        ideas
    }

    const formData = new FormData();
    formData.append('ideas', JSON.stringify(ideas))
    
    const response = await fetch ('http://127.0.0.1:8000/api/ideas/create', {
        method: 'POST',
        mode: 'cors',
        body: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
        }
    })

    return (dispatch: DispatchIdeasType) => {
        return dispatch(action)
    }
}