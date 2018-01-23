import React, { Component } from 'react';

export default class NewArticleScreen extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target.elements.title.value);
    // console.log(e.target.elements.content.value);
    const formData = new FormData(e.target);
    const dataObj = {};
    // console.log(formData.get('title'))
    // console.log(formData.get('content'))
    for (const [key, value] of formData) {
      dataObj[key] = value;
    }
    this.props.onFormSubmit(dataObj);
  }

  render() {
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <fieldset>
            <input type="text" name="title" id=""/>
            <textarea name="content" id="" cols="30" rows="10"></textarea>
            <button type="submit">저장</button>
          </fieldset>
        </form>
      </div>
    );
  }
}
