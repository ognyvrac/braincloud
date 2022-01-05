export type IdeaType = {
    ideaId: number;
    content: string;
};

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

