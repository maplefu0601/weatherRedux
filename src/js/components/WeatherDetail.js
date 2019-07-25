import React, { Component } from 'react';
import Moment from 'react-moment';
import { Button, Table, Modal } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import '../../App.css';
import { connect } from 'react-redux';
import * as weatherService from '../actions/index';

class WeatherDetail extends Component {
    componentWillMount() {
        console.log('mount detail...');
        this.props.showForecast(this.props.city.id);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.city.id !== this.props.city.id) {
            this.props.showForecast(this.props.city.id);
        }
    }
    render() {
        let active = 2;
        let items = [];
        const { list } = this.props.weatherInfoDetail;
        items.push(<Pagination.First />, <Pagination.Prev />);
        for (let number = 1; number <= 5; number++) {
            items.push(
                <Pagination.Item key={number} active={number === active} onClick={this.props.pageChange}>
                    {number}
                </Pagination.Item>,
            );
        }
        items.push(<Pagination.Next />, <Pagination.Last />);

        return (
            <>
                <Modal show={this.props.show} onHide={() => this.props.hide()} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Weather forecast for {this.props.city.name}, {this.props.city.country}
                        </Modal.Title>
                        <Button variant="secondary" className="right" onClick={() => this.props.hide()}>
                            Close
                        </Button>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Temp</th>
                                    <th>Min Temp</th>
                                    <th>Max Temp</th>
                                    <th>Wind</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map(e => (
                                    <tr key={e.dt}>
                                        <td key={Math.random()}>
                                            <Moment format="MM/DD/YYYY @ hh:mm A">{e.dt * 1000}</Moment>
                                        </td>
                                        <td key={Math.random()}>{e.main.temp}</td>
                                        <td key={Math.random()}>{e.main.temp_min}</td>
                                        <td key={Math.random()}>{e.main.temp_max}</td>
                                        <td key={Math.random()}>{e.wind.speed}</td>
                                        <td key={Math.random()}>{e.weather[0].description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Pagination>{items}</Pagination>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => {
    console.log('city state:', state);
    return {
        city: state.reducerSelectCity.selectedCity,
        weatherInfoDetail: state.reducerWeatherDetail.weatherInfoDetail,
        show: state.reducerWeatherDetail.show,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        hide: () => {
            dispatch(weatherService.hideWeatherDetail());
        },
        showForecast: cityId => dispatch(weatherService.getWeatherDetail(cityId)),
        pageChange: event => {
            dispatch(weatherService.showPages(event));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(WeatherDetail);
