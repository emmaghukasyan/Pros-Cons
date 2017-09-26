import React, {Component} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import ProsCons from './ProsCons';
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Grid fluid className="content">
                <Row className="header">
                    <Col xs={12}>
                        <Row center="xs">
                            <Col xs={6}>
                                <h3> Should I eat at McDonalds? </h3>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <ProsCons />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default App;