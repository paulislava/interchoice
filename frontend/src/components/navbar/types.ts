import React from 'react'

export type OwnProps = {}

export interface StateProps {
  pageTitle: React.ReactNode
}

export type DispatchProps = {}

export type ComponentPropsType = OwnProps & StateProps & DispatchProps
