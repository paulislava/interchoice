import * as React from 'react'
import ReactFlow, {
    addEdge,
    FitViewOptions,
    applyNodeChanges,
    applyEdgeChanges,
    Node,
    Edge
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
                { id: '2', data: { label: 'Node 2' }, position: { x: 5, y: 100 } }
            ],
            connections: [{ id: 'e1-2', source: '1', target: '2' }]
        }
    }

    render(): React.ReactNode {
        const fitViewOptions: FitViewOptions = {
            padding: 0.2
        }

        return (
            <div className={styles.flowchart}>
                <ReactFlow
                    nodes={this.state.nodes}
                    edges={this.state.connections}
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
                    fitView
                    fitViewOptions={fitViewOptions}
                />
            </div>
        )
    }
}
