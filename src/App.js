import React from 'react';
import logo from './logo.svg';
import './App.css';

import {BarChart,  Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import produce from 'immer/dist/immer';

class App extends React.PureComponent {
  state = {
    fecha:'',
    ejex:'',
    ejeyuno:'',
    ejeydos:'',
		fechas: [
			{
        fecha: '18/12/2019',
        xaxis: '18 dic de 2019',
        y1axis: 3,
        y2axis: 18,
			},{
        fecha: '19/12/2019',
        xaxis: '19 dic de 2019',
        y1axis: 4,
        y2axis: 29,
			},{
        fecha: '20/12/2019',
        xaxis: '20 dic de 2019',
        y1axis: 5,
        y2axis: 30,
			}
		]
  };

addData = () => {

    const nextState = produce(this.state, (draft)=> {
      draft.fechas.push({
          fecha:this.state.fecha,
          xaxis: this.state.ejex,
          y1axis:this.state.ejeyuno,
          y2axis:this.state.ejeydos,
      });
})

  this.setState(nextState);
  this.setState({ fecha:'', ejex: '', ejeyuno: '', ejeydos: ''});
};
  
deleteData = (key) => {
  const nextState = produce(this.state, (draft) => {
    draft.fechas.splice(key, 1);
  });
  this.setState(nextState);
};



addejeyuno= (event)=>{
  const valor = event.target.value;
  this.setState({ejeyuno: valor});
}

addejeydos= (event)=>{
  const valor = event.target.value;
  this.setState({ejeydos: valor});
}

adddate= (event)=>{
  let valor = event.target.value;
  let options = { year: 'numeric', month: 'long', day: 'numeric' };
  let ss = valor+'T07:22:13' ;
  let dat = new Date(ss);
  let letter = dat.toLocaleDateString([], options); 

  this.setState({fecha: valor, ejex: letter});
}
  

  render (){

    const { fechas } = this.state;

    return (
      <div className="App">
        
        <div className="container">
        <br></br>  

        <div className="form-group row">

          <div className="col-md-3" key="1">

          <div class="card text-center border-secondary mb-3">
            <div class="card-header">
              MIS DATOS
            </div>
            <div class="card-body">
              
            <div className="form-group row">
              <div className="form-group col-md-2">
                <label className="font-weight-bold" htmlFor="">X</label>
              </div>
              <div className="form-group col-md-10">
                <input type="date" className="form-control" value= {this.state.fecha} onChange={(event) => this.adddate(event)}/>
              </div>
            </div>

            <div className="form-group row">
              <div className="form-group col-md-2">
                <label className="font-weight-bold" htmlFor="">Y1</label>
              </div>
              <div className="form-group col-md-10">
                <input type="text" className="form-control" value= {this.state.ejeyuno} onChange={(event) => this.addejeyuno(event)}/>
              </div>
            </div> 

            
            <div className="form-group row">
              <div className="form-group col-md-2">
                <label className="font-weight-bold" htmlFor="">Y2</label>
              </div>
              <div className="form-group  col-md-10">
                <input type="text" className="form-control" value= {this.state.ejeydos} onChange={(event) => this.addejeydos(event)} />
              </div>
            </div>   

            </div>
            <div class="card-footer text-muted">
            <button onClick={() => this.addData()} className="btn-xs btn-info">Agregar</button>
            </div>
          </div>

          </div>

          <div className="col-md-3" key="1">
          <div class="card text-center border-secondary mb-3">
              <div className="card-header bg-transparent border-secondary">X AXIS</div>
              <div className="card-body text-success">

                <ul className="list-group">

                {fechas.map((fecha, i) => (

                      <li key={i} className="list-group-item d-flex justify-content-between align-items-center">{fecha.xaxis}
                        <button className="btn-xs btn-danger" onClick={() => this.deleteData(i)}>
                          <i className="fa fa-times"></i>
                        </button>
                      </li>
                ))}
                  
                </ul>  

              </div>
            </div>
          </div>


          <div className="col-md-3" key="2">
          <div class="card text-center border-secondary mb-3">
                  <div className="card-header bg-transparent border-secondary">Y1 AXIS</div>
                  <div className="card-body text-success">
                    {/*<h5 className="card-title">Success card title</h5>*/}
                    <ul className="list-group">
                    {fechas.map((fecha, i) => (

                      <li  key={i} className="list-group-item d-flex justify-content-between align-items-center">{fecha.y1axis}
                        <button className="btn-xs btn-danger" onClick={() => this.deleteData(i)}>
                          <i className="fa fa-times"></i>
                        </button>
                      </li>

                    ))}
                    </ul>                
                  </div>
                </div>
          </div>

          <div className="col-md-3" key="3">
          <div class="card text-center border-secondary mb-3">
              <div className="card-header bg-transparent border-secondary">Y2 AXIS</div>
              <div className="card-body text-success">
              {fechas.map((fecha, i) => (

                <li  key={i} className="list-group-item d-flex justify-content-between align-items-center">{fecha.y2axis}
                  <button className="btn-xs btn-danger" onClick={() => this.deleteData(i)}>
                    <i className="fa fa-times"></i>
                  </button>
                </li>

                ))}              
              </div>
            </div>
          </div>

          </div>

          <div className="col-md-6" key="4"></div>
            <table className='tabla' border="1" cellspacing="30">
              <tbody>

              <tr>
                  <th>XAXIS</th>
                  <th>Y1AXIS</th>
                  <th>Y2AXIS</th>
              </tr>

              {fechas.map((fecha, i) => {
                  return (
                      <tr key={i}>
                          <td>{fecha.xaxis}</td>
                          <td>{fecha.y1axis}</td>
                          <td>{fecha.y2axis}</td>
                      </tr>
                  );
              })}

              </tbody>
            </table>

        <br></br>
        <BarChart
              width={700}
              height={500}
              data={fechas}
              margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5
              }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="xaxis" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="y1axis" fill="#8884d8" />
              <Bar dataKey="y2axis" fill="#82ca9d" />
          </BarChart>          

        </div>

        <br></br>
        <br></br>

      </div>
    );
  }
}

export default App;
