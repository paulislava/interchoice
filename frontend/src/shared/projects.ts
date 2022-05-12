export interface ProjectDraft {
  Name: string
  ShortDescription: string
  FullDescription: string
  Overview: File
}

export interface ProjectScene {
  id: string
  x?: number
  y?: number
  name?: string
  childrens?: string[]
}

export interface ProjectFull {
  projectId: string
  userId: string
  name: string
  previewUrl?: string
  shortDescription?: string
  fullDescription?: string
  nodesId: ProjectScene[]
}
