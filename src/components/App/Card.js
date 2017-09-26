import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';

const style = {
    border: 'none',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',

};

const cardSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index,
        };
    },
};

const cardTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        if (dragIndex === hoverIndex) {
            return;
        }

        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        const clientOffset = monitor.getClientOffset();

        const hoverClientY = clientOffset.y - hoverBoundingRect.top;


        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        props.moveCard(dragIndex, hoverIndex);

        monitor.getItem().index = hoverIndex;
    },
};

@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))
export default class Card extends Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
        isDragging: PropTypes.bool.isRequired,
        id: PropTypes.any.isRequired,
        value: PropTypes.string.isRequired,
        pc: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
    };

    render() {
        const { value, id, pc, onChange, isDragging, connectDragSource, connectDropTarget } = this.props;
        const opacity = isDragging ? 0 : 1;

        return connectDragSource(connectDropTarget(
            <div >
                <input style={{ ...style, opacity }} type="text" defaultValue={value} onChange={e=>onChange(e.target.value, id, pc)} />
            </div>
        ));
    }
}