export interface IdeaType {
    id: number;
    content: string;
    votes?: number;
    criteria1?: number;
    criteria2?: number;
};

export type IdeaState = {
    ideas: IdeaType[]
}

export type IdeasAction = {
    type: string
    ideas: IdeaType[]
}

export type DispatchIdeasType = (args: IdeasAction) => IdeasAction

export type GroupType = {
    groupId: number;
    name: string;
    ideasG: IdeaType[];
};

export type Criteria = {
    name: string
}

export type PlotData = {
    idea: string
    criteriax: number
    criteriay: number
}

