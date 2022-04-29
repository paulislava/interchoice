import * as React from 'react'
import ReactFlow, {
    addEdge,
    FitViewOptions,
    applyNodeChanges,
    applyEdgeChanges,
    Node,
    Edge,
    SmoothStepEdge,
    Position
} from 'react-flow-renderer'
import styles from './styles.styl'

export interface ComponentPropsType {
    test?: string
    test1?: number
}

export interface ComponentState {
    nodes: Node[]
    connections: Edge[]
}

export class ScenesEditor extends React.Component<ComponentPropsType, ComponentState> {
    constructor(props: ComponentPropsType) {
        super(props)
        this.state = {
            nodes: [
                { id: '1', data: { label: 'Node 1' }, position: { x: 5, y: 5 } },
                { id: '2', data: { label: 'Node 2' }, position: { x: 5, y: 100 } },
                { id: '3', data: { label: <div>test</div> }, position: { x: 50, y: 300 } },
                { id: '4', data: { label: 'Node 4' }, position: { x: 50, y: 200 } },
            ],
            connections: []
        }
    }

    render(): React.ReactNode {
        const fitViewOptions: FitViewOptions = {
            padding: 0.2
        }

        const nodes: Node[] = this.state.nodes.map(node => ({
            ...node,
            targetPosition: Position.Right,
            sourcePosition: Position.Left
        }))

        return (
            <div className={styles.flowchart}>
                <ReactFlow
                    nodes={nodes}
                    edges={this.state.connections}
                    edgeTypes={{ default: SmoothStepEdge }}
                    onNodesChange={changes =>
                        this.setState({ nodes: applyNodeChanges(changes, this.state.nodes) })
                    }
                    onEdgesChange={edges =>
                        this.setState({
                            connections: applyEdgeChanges(edges, this.state.connections)
                        })
                    }
                    onConnect={connection =>
                        this.setState({ connections: addEdge(connection, this.state.connections) })
                    }
                    onEdgesDelete={edges => this.setState({ connections: this.state.connections.filter(connection => !edges.includes(connection)) })}
                    fitView
                    fitViewOptions={fitViewOptions}
                />
            </div>
        )
    }
}
