import React, { Component } from 'react';
import { Breadcrumb,BreadcrumbItem, Card, CardImg, CardBody, CardText, CardTitle,Button,Modal, ModalHeader, ModalBody ,Label,Row,Col} from 'reactstrap';
import { Control,LocalForm,Errors} from 'react-redux-form';
import {Link } from "react-router-dom";
import {Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger} from 'react-animation-components'

  function ConvertDateToCommentDateFormat({timestamp}) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
  }

  function RenderDish({dish}) {
    return (
      <FadeTransform in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
      <Card>
       <CardImg top src={baseUrl + dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
      </FadeTransform>
     
    );
  }

  function RenderComments({comments, postComment, dishId }) {
    if (comments == null || comments.length === 0) {
      return (
        <div></div>
      );
    }

    const renderedComments = comments.map((comment) => {
      return (
        <Fade in>
          <li>
            <p>{comment.Comment}</p>
            <p>-- {comment.author}, <ConvertDateToCommentDateFormat timestamp={comment.date}/></p>
          </li>
        </Fade>
      );
    });

    return (
      <div>
        <h4>Comments</h4>
        <ul className="list-unstyled">
          <Stagger in>
            
            { renderedComments }
          
          </Stagger>
          <CommentForm dishId={dishId} postComment={postComment}/>
        </ul>
      </div>
    );
  }

  const DishDetail=(props) => {
    if(props.isLoading){
      return(
        <div className='container'>
          <div className="row">
            <Loading/>
          </div>
        </div>
      );
    }
    else if(props.errMess){
      return(
        <div className='container'>
          <div className="row">
            <h4>{props.errMess}</h4>
          </div>
        </div>
      );
    }
    else if (props.dish != null) {
      return (
        <div className="container">

        <div className="row">
            <Breadcrumb>
              <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
              <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <h3>{props.dish.name}</h3>
              <hr/>
            </div>
          </div>
          <div className='row'>
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish ={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.comments}
            postComment={props.postComment}
            dishId={props.dish.id}
            />
            
          </div>
          </div>
          
        </div>
        
      );
    }
    else {
      return (
        <div></div>
      );
    }
  }

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{
  constructor(props){
    super(props)
    this.state ={
    
      isModalOpen: false
  }; 
  this.toggleModal =this.toggleModal.bind(this);
  this.handleSubmit =this.handleSubmit.bind(this);

  }
  toggleModal(){
    this.setState({
        isModalOpen: !this.state.isModalOpen
    });
  }
  handleSubmit(values)
  {   this.toggleModal();
      this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);

  }
  render(){
    return(
    <div >
    <Button type="submit" className="btn btn-outline-secondary" onClick={this.toggleModal}>
      <span className="fa fa-pencil fa-lg "> Submit Comment</span>   
    </Button>
    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
      <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
      <ModalBody>
      <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
        <Row className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Col md={12}>
                                
                                      <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                      
                                      <option selected value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                      <option value="5">5</option>
                                      </Control.select>
                                </Col>
          </Row>
                <Row className="form-group">
                                <Label htmlFor="author" md={4} >Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                           
                            
                            
                    <Row className="form-group">
                        <Label htmlfor="comment" md={2}>Comment</Label>
                        <Col md={12}>
                            <Control.textarea model=".comment" id="comment" name="comment"
                                rows="6"
                                className="form-control"
                                />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col md={{size:10,offset: 2}}>
                            <Button type="submit" color="primary">
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </LocalForm>
      </ModalBody>  
    </Modal>

    </div>
    
    );
  }
}

export default DishDetail;