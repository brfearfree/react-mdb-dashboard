import React, {Component} from 'react';
import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardHeader,
    MDBContainer, MDBListGroup, MDBListGroupItem
} from "mdbreact";

import ChartsPage from './pages/ChartsPage.js'

class App extends Component {
    state = {
        graph : [{
            "title": "1",
            "monthTrend": "1",
            "monthSum": 1,
            "dayTrend": "1",
            "daySum": 1
        }],
        deals: [],
        'is_loaded' : false
    };

    componentDidMount() {
        console.log('Started..');
        this.serverConnect();
    }

    serverConnect = () => {
        let conn;
        if (window["WebSocket"]) {
            conn = new WebSocket("ws://" + document.location.host + "/ws");
            conn.onclose = function (evt) {
                let item = document.createElement("div");
                item.innerHTML = "<b>Connection closed.</b>";
                console.log(item);
            };
            conn.onmessage = (evt) => {
                if(evt.data){
                    let d = JSON.parse(evt.data);
                    console.log(d);

                    if(d){
                        let du = {is_loaded : true};
                        if(d.graph){
                            du.graph = d.graph;

                            if(d.deals && (!this.state.deals || this.state.deals.length === 0)){
                                console.log('replace deals');
                                du.deals = d.deals;
                            }
                        }
                        else if(d.deals){
                            const newDeals = [...this.state.deals];
                            d.deals.forEach((value) => {
                                newDeals.pop();
                                newDeals.unshift(value);
                            });
                            du.deals = newDeals;
                        }
                        this.setState(du);
                    }
                }
            };
        } else {
            let item = document.createElement("div");
            item.innerHTML = "<b>Your browser does not support WebSockets.</b>";
            console.log(item);
        }
    }

    render() {

        let dealsHtml;

        if (this.state.is_loaded && (this.state.deals)) {
            dealsHtml = this.state.deals.map((item, i) => {

                return (
                    <MDBListGroupItem>
                        <div className="d-flex w-100 justify-content-between">
                            <small className="mb-1">{item.code}</small>
                            <small>{item.time}</small>
                        </div>
                        <p className="mb-1 green-text">+&euro;{item.sum}</p>
                        <small>{item.shop}</small>
                    </MDBListGroupItem>
                );
            })
        } else {
            dealsHtml = <></>
        }

        let ReportContainer = (
            <MDBContainer style={{width: "1360px"}}>
                <MDBRow>
                    <MDBCol size="3">
                        <MDBRow>
                            <MDBCol>
                                <MDBCard>
                                    <MDBCardHeader color="primary-color" tag="h3">
                                        Latest deals
                                    </MDBCardHeader>
                                </MDBCard>
                                <MDBListGroup>
                                    {dealsHtml}
                                </MDBListGroup>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                    <MDBCol size="9">
                        <ChartsPage
                            gdata={this.state.graph}
                        />
                    </MDBCol>
                </MDBRow>
                </MDBContainer>
        );

        let LoaderContainer = (
            <MDBContainer>
                <div className="spinner-border mySpinner" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </MDBContainer>
        );

        return (this.state.is_loaded) ? ReportContainer : LoaderContainer;
    }
}

export default App;
