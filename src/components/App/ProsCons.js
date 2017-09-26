import React, { Component } from 'react';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from './Card';
import { Grid, Row, Col } from 'react-flexbox-grid';
import keyIndex from 'react-key-index';

const style = {
    border: '1px solid grey',
}

@DragDropContext(HTML5Backend)
export default class ProsCons extends Component {
    constructor(props) {
        super(props);
        this.moveCardProses = this.moveCardProses.bind(this);
        this.moveCardConses = this.moveCardConses.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            proses: [{
                text: 'It is really tasty!',
            }, {
                text: 'It is really tasty!',
            }],
            conses: [{
                text: 'It is not tasty!',
            }, {
                text: 'It is not tasty!',
            }, {
                text: 'It is really tasty!',
            }]
        };
    }

    componentWillMount() {
        let proses = this.state.proses;
        let conses = this.state.conses;
        keyIndex(proses, 1);
        keyIndex(conses, 1);
        this.setState({proses: proses});
        this.setState({conses: conses});
    }

    moveCardProses(dragIndex, hoverIndex) {
        const proses = this.state.proses;
        const dragCard = proses[dragIndex];

        this.setState(update(this.state, {
            proses: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard],
                ],
            },
        }));
    }

    moveCardConses(dragIndex, hoverIndex) {
        const conses = this.state.conses;
        const dragCard = conses[dragIndex];

        this.setState(update(this.state, {
            conses: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard],
                ],
            },
        }));
    }

    onChange(value, id, pc) {
        let pces = this.state[pc];
        let existItem = pces.find(function (i) {
            return i._textId == id;
        });
        if (!existItem) {
            console.log(existItem)
            let newItem = {text: value};
            pces.push(newItem);
            keyIndex(pces, 1);
        }
        else {
            pces.forEach(function (item) {
                if (item._textId === id) {
                    item.text = value;
                }
            });
        }
        if (value === '') {
            pces = pces.filter(function (emptyItem) {
                return emptyItem.text !== '';
            });
        }
        this.state[pc] = pces;
        this.forceUpdate();
    }

    render() {
        const { proses, conses } = this.state;

        return (
            <Row center="xs">
                <Col xs={6} md={6}>
                    <Row center="xs" style={style}>
                        <Col xs={6}>
                            <h3> PROS </h3>
                        </Col>
                    </Row>
                    <Row style={style} className="lists">
                        {proses.map((item, i) => (
                            <Row start="xs">
                                <Col xsOffset={2} xs={1} md={1}>
                                    <span>{i + 1}. </span>
                                </Col>
                                <Col xs={9} md={9}>
                                    <Card
                                        key={item._textId}
                                        index={i}
                                        id={item._textId}
                                        value={item.text}
                                        pc="proses"
                                        moveCard={this.moveCardProses}
                                        onChange={this.onChange}

                                    />
                                </Col>
                            </Row>
                        ))}

                        <Row start="xs">
                            <Col xsOffset={2} xs={1} md={1}>
                                <span>{proses.length + 1}. </span>
                            </Col>
                            <Col xs={9} md={9}>
                                <Card
                                    key={proses.length+1}
                                    index={proses.length+1}
                                    id={proses.length+1}
                                    value=""
                                    pc="proses"
                                    onChange={this.onChange}
                                />
                            </Col>
                        </Row>
                    </Row>
                </Col>
                <Col xs={6} md={6}>
                    <Row center="xs" style={style}>
                        <Col xs={6}>
                            <h3> CONS </h3>
                        </Col>
                    </Row>
                    <Row style={style} className="lists">
                        {conses.map((item, i) => (
                            <Row start="xs">
                                <Col xsOffset={2} xs={1} md={1}>
                                    <span>{i + 1}. </span>
                                </Col>
                                <Col xs={9} md={9}>
                                    <Card
                                        key={item._textId}
                                        index={i}
                                        id={item._textId}
                                        value={item.text}
                                        pc="conses"
                                        moveCard={this.moveCardConses}
                                        onChange={this.onChange}
                                    />
                                </Col>
                            </Row>
                        ))}
                        <Row start="xs">
                            <Col xsOffset={2} xs={1} md={1}>
                                <span>{conses.length + 1}. </span>
                            </Col>
                            <Col xs={9} md={9}>
                                <Card
                                    key={conses.length+1}
                                    index={conses.length+1}
                                    id={conses.length+1}
                                    value=""
                                    pc="conses"
                                    onChange={this.onChange}
                                />
                            </Col>
                        </Row>
                    </Row>
                </Col>
            </Row>
        );
    }
}