import React, { Component } from 'react';
import { render } from 'react-dom';
import { Card, CardImg,  CardImgOverlay, CardText, CardBody, CardTitle, Media} from 'reactstrap';


class DishDetail extends Component{

    renderDish(dish){
        
        return(
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>         
        );
        
    }
    renderComments(){
        const DishDetail = this.props.selectedDish['comments'].map((dish) => {
            return (

                <div key={dish.id}>
                    
                    <ul class="list-unstyled">
                        <li>{dish.comment}</li> <br></br>     
                        <li>--{dish.author}, {dish.date}</li>
                    </ul>
              </div>
            );
         });
      
         return (
                <div >
                    <h4>comments</h4>
                    {DishDetail}
                </div>
         );
        
    } 

    render() {      
            return (
                <div className="row">
                  <div  className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.selectedDish)}
                  </div>
                  <div  className="col-12 col-md-5 m-1">
                    {this.renderComments()}
                  </div>     
                </div>
              
            );
    }
}
export default DishDetail;