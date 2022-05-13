export interface ProjectDraft {
  Name: string
  ShortDescription: string
  FullDescription: string
  Overview: File
}

export interface ProjectSceneData {
  id: string
  name?: string
  description?: string
  buttonName?: string
}

export interface ProjectScene extends ProjectSceneData {
  id: string
  x?: number
  y?: number
  parentGuids?: string[]
  childrenGuids?: string[]
  videoUrl?: string
}

export interface ProjectFull {
  projectId: string
  userId: string
  name: string
  previewUrl?: string
  shortDescription?: string
  fullDescription?: string
  nodes: ProjectScene[]
}
