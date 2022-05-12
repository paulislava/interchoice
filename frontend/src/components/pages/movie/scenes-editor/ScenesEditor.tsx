import * as React from 'react'
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  SmoothStepEdge,
  Position,
  NodeChange
} from 'react-flow-renderer'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import styles from './styles.styl'
import { SceneNode } from './scene-node/SceneNode'
import withPageInfo from 'root/store/page/pageinfo'
import { useAppSelector } from 'root/store/application.store'
import { Loader } from 'components/Loader'
import {
  addScene,
  deleteScene,
  getProject,
  updateSceneCoordinates
} from 'root/store/movie/project/project.actions'
import { PageInfoProps } from 'root/store/page/page.types'
import './styles.css'

export interface ScenesEditorRouteProps {
  movieId: string
}

export type ScenesEditorProps = RouteComponentProps<ScenesEditorRouteProps> & PageInfoProps

const ScenesEditorComponent: React.FC<ScenesEditorProps> = props => {
  const project = useAppSelector(state => state.project.value)
  const projectId = props.match.params.movieId
  const dispatch = useDispatch()

  useEffect(() => {
    if (projectId && !project) dispatch(getProject.request(projectId))

    if (project) {
      props.setPageInfo({
        title: `Редактор сцен: ${project.name}`
      })
    }
  }, [projectId, project])

  const [currentNodes, setCurrentNodes] = useState<Node[]>([])
  const [currentConnections, setCurrentConnections] = useState<Edge[]>([])

  useEffect(() => {
    const nodes: Node[] =
      project?.nodesId.map(node => ({
        id: node.id,
        position: { x: node.x ?? 0, y: node.y ?? 0 },
        data: { label: <SceneNode name={node.name} /> },
        targetPosition: Position.Right,
        sourcePosition: Position.Left
      })) ?? []
    setCurrentNodes(nodes)

    const connections: Edge[] =
      project?.nodesId.flatMap(
        node =>
          node.childrens?.flatMap(children => ({
            id: `${node.id}_${children}`,
            source: node.id,
            target: children
          })) ?? []
      ) ?? []
    setCurrentConnections(connections)
  }, [project?.nodesId])

  const nodesChangeHandler = useCallback(
    (changes: NodeChange[]) => {
      setCurrentNodes(applyNodeChanges(changes, currentNodes))
    },
    [currentNodes]
  )

  const nodeDragEndHandler = (_event, node: Node): void => {
    dispatch(
      updateSceneCoordinates.request({
        id: node.id,
        x: node.position.x,
        y: node.position.y
      })
    )
  }

  if (!project) return <Loader />

  return (
    <div className={styles.flowchart}>
      <div className={styles.header}>
        <Button
          variant='outlined'
          onClick={() => {
            dispatch(addScene.request(projectId))
          }}
        >
          Добавить сцену +
        </Button>
      </div>
      <ReactFlow
        className={styles.flowchartContent}
        nodes={currentNodes}
        edges={currentConnections}
        edgeTypes={{ default: SmoothStepEdge }}
        onNodesChange={nodesChangeHandler}
        onNodeDragStop={nodeDragEndHandler}
        onNodesDelete={nodes => nodes.map(node => dispatch(deleteScene.request(node.id)))}
        onEdgesChange={edges => setCurrentConnections(applyEdgeChanges(edges, currentConnections))}
        onConnect={connection => setCurrentConnections(addEdge(connection, currentConnections))}
        onEdgesDelete={edges =>
          setCurrentConnections(
            currentConnections.filter(connection => !edges.includes(connection))
          )
        }
        fitView
        fitViewOptions={{
          padding: 0.2
        }}
      />
    </div>
  )
}

export const ScenesEditor = withRouter(withPageInfo(ScenesEditorComponent))
