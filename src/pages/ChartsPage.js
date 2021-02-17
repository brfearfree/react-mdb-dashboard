import React from 'react';
import {
  HorizontalBar
} from 'react-chartjs-2';
import { MDBRow, MDBCol } from 'mdbreact';
import SectionContainer from '../components/sectionContainer';

const ChartsPage = (props) => {
  let labels = [];
  let v1s = [];
  let v2s = [];
  let v3s = [];
  let v4s = [];

  props.gdata.forEach((currentValue, index) => {
    labels.push(currentValue.title);
    v1s.push(currentValue.daySum);
    v2s.push(currentValue.dayTrend);
    v3s.push(currentValue.monthSum);
    v4s.push(currentValue.monthTrend);

  });

  let dataBarDay = {
    labels: labels,
    datasets: [
      {
        label: 'Dienas apgrozijums',
        backgroundColor: '#46A74A',
        borderColor: '#46A74A',
        borderWidth: 2,
        hoverBackgroundColor: '#46A74A',
        hoverBorderColor: '#46A74A',
        data: v1s
      },
    ],
    options: {
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  };

  // barChart
  let dataBarDayPrc = {
    labels: labels,
    datasets: [
      {
        label: 'Dienas plans (%)',
        backgroundColor: '#ac64ad',
        borderColor: '#ac64ad',
        borderWidth: 2,
        hoverBackgroundColor: '#ac64ad',
        hoverBorderColor: '#ac64ad',
        data: v2s,
        options: {
          scales: {
            xAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      },
    ],
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }

  };

  // barChart
  let dataBarMonth = {
    labels: labels,
    datasets: [
      {
        label: 'Meneša apgrozijums',
        backgroundColor: '#FDB45C',
        borderColor: '#FDB45C',
        borderWidth: 2,
        hoverBackgroundColor: '#FDB45C',
        hoverBorderColor: '#FDB45C',
        data: v3s
      },
    ]
  };

  // barChart
  let dataBarMonthPrc = {
    labels: labels,
    datasets: [
      {
        label: 'Meneša trend (%)',
        backgroundColor: '#4D5360',
        borderColor: '#4D5360',
        borderWidth: 2,
        hoverBackgroundColor: '#4D5360',
        hoverBorderColor: '#4D5360',
        data: v4s
      },
    ]
  };

  return (
    <>
      <MDBRow style={{ padding: "0px 0px 0px 0px" }}>
        <MDBCol size="6">
          <SectionContainer header=''>
            <HorizontalBar data={dataBarDay} options={{ responsive: true }} />
          </SectionContainer>
        </MDBCol>
        <MDBCol size="6">
          <SectionContainer header=''>
            <HorizontalBar data={dataBarDayPrc} options={{ responsive: true }} />
          </SectionContainer>
        </MDBCol>
      </MDBRow>
      <MDBRow style={{ padding: "0px 0px 0px 0px" }}>
        <MDBCol size="6">
          <SectionContainer header=''>
            <HorizontalBar data={dataBarMonth} options={{ responsive: true }} />
          </SectionContainer>
        </MDBCol>
        <MDBCol size="6">
          <SectionContainer header=''>
            <HorizontalBar data={dataBarMonthPrc} options={{ responsive: true }} />
          </SectionContainer>
        </MDBCol>
      </MDBRow>
    </>
  );
};

export default ChartsPage;