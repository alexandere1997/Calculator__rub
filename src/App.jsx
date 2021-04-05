import React, { Component } from 'react'
import './App.css'

export default class App extends Component{
    
    maxId = 100;

  state = {
      array: [
          {"id": 1,"name": "EUR", "price": 89.59},
          {"id": 2,"name": "USD", "price": 76.07},
          {"id": 4,"name": "CHF", "price": 80.83},
          {"id": 5,"name": "GBP", "price": 105.29},
          {"id": 6,"name": "CAD", "price": 60.56},
          {"id": 7,"name": "CAD", "price": 60.56}
      ],
      list_one: true,
      valueS: 1,
      name: "USD",
      price: "",
      valuePrice: 76.07,
      addModal: true,
      priceValue: "",
      nameValue: ""
  }

BtnClick_one = () => {
      this.setState((state) => {
          return {
              list_one: !state.list_one,
          }
      })
}
handleChange = (event) => {
      this.setState({
          valueS: event.target.value,
    });
}
componentDidUpdate = () => {
    const { name, valueS, valuePrice, array } = this.state;
    localStorage.setItem('name', name);
    localStorage.setItem('valueS', valueS);
    localStorage.setItem('valuePrice', valuePrice);
    localStorage.setItem('array', JSON.stringify(array));
}
componentDidMount() {
    const name = localStorage.getItem('name');
    const valueS = localStorage.getItem('valueS');
    const valuePrice = localStorage.getItem('valuePrice');
    const array = localStorage.getItem("array");
    let ArrMass = JSON.parse(array);
    this.setState({ name, valueS, valuePrice});
    this.setState(() => {
        return {
            array: ArrMass
        }
    })

    if(localStorage.getItem('name') == null) {
        const { name, valueS, valuePrice, array } = this.state;
        this.setState({ name, valueS, valuePrice, array});
    }
}
itemsClick = (e) => {
      this.setState((state) => {
          return {
              name: e.target.innerHTML,
              list_one: !state.list_one,
              valuePrice: e.target.dataset.name,
          }
      })
}
closeApp = (id) => {
    this.setState(({ array }) => {
      const inx = array.findIndex((el) => el.id === id);

      const newArr = [...array.slice(0, inx), ...array.slice(inx + 1)]

      return {
        array: newArr
      }
    })
  }
AddClickModal = () => {
      this.setState((state) => {
          return {
            addModal: !state.addModal,
            list_one: !state.list_one,
          }
      })
  }
closeModal = () => {
      this.setState((state) => {
          return {
            addModal: !state.addModal
          }
      })
}
addArray = (text, number) => {
    if(text == "" && number == "") {
        alert("Заполните поля")
    }
    else {
        this.setState((state) => {
            return {
              addModal: !state.addModal
            }
        })
        const newItem = {
            id: this.maxId++,
            name: text,
            price: number,
        }
        this.setState(({ array }) => {
            const newArr = [
                ...array,
                newItem
            ];
    
            return {
                array: newArr
            }
        });
    }
    this.setState({
        nameValue: "",
        priceValue: ""
      })
}
funcNameValue = (event) => {
    this.setState({
        nameValue: event.target.value,
  });
}
funcPriceValue = (event) => {
    this.setState({
        priceValue: event.target.value,
  });
}

  render() {

      const {array, list_one, valueS, name, valuePrice, addModal, priceValue, nameValue} = this.state;
      let className_one = "app__list_one";
      let className__modal = "app__modal";
      let lists = array.map(item => {
          return(
          <div className="app__item" key={item.id}>
              <p className="app__prices" onClick={this.itemsClick} data-name={item.price}>{item.name}</p>
              <p className="app__deleted" onClick={() => this.closeApp(item.id)}>&times;</p>
          </div>
          )
      });
      if(list_one) {
          className_one = "app__list_none"
      }
      if(addModal) {
        className__modal = "app__modal_none"
      }
      let values = valueS;
      let resValue = Number(valuePrice) * Number(values);
      return(
          <div className="app">
              <h3 className="app__title">Стоимость рубля</h3>
              <div className="app__box">
                  <div className="app__items">
                      <div className="app__inner" onClick={this.BtnClick_one}>{name}</div>
                      <div className={className_one}>
                      {lists}
                      <div className="app__item">
                          <p className="app__modalAd" onClick={this.AddClickModal}>Добавить</p>
                      </div>
                      </div>
                  </div>
                  <div className="app__wrapper">
                      <input type="text" value={valueS} onChange={this.handleChange}/>
                  </div>
              </div>
              <div className="app__box">
                  <div className="app__items">
                      <div className="app__inner">RUB</div>
                      <div className="app__list_two">
                      {lists}
                      <div className="app__item">
                          <p className="app__modalAd">Добавить</p>
                      </div>
                      </div>
                  </div>
                  <div className="app__wrapper">
                      <input type="text" value={resValue} onChange={() => console.log(resValue)} />
                  </div>
              </div>
              <div className={className__modal}>
                  <div className="app__modals">
                      <div>
                          <p>Name</p>
                          <input type="text" placeholder="USD" value={nameValue} onChange={this.funcNameValue} required/>
                      </div>
                      <div>
                          <p>price</p>
                          <input type="number" placeholder="10.55" value={priceValue} onChange={this.funcPriceValue} required/>
                      </div>
                      <button className="app__button" onClick={() => this.addArray(nameValue, priceValue)}>Добавить</button>
                      <p onClick={this.closeModal} className="app__close">&times;</p>
                  </div>

              </div>
          </div>
      )
  }
}