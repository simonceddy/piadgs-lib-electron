import React, { Component } from 'react';
import { managerDefaultState } from '../../shared/store';
import { getTitles } from '../../message-control/controllers';

class TitleManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...managerDefaultState
    };
  }

  componentDidMount() {
    this.fetchTitles();
  }

  componentWillUnmount() {}

  setFilter(title) {
    this.setState({
      filter: { title }
    });
  }

  fetchTitles() {
    getTitles({
      filter: this.state.filter,
      page: this.state.currentPage,
      itemsPerPage: this.state.itemsPerPage,
      sortColumn: this.state.sortCol,
      sortDirection: this.state.sortDirection
    }).then((results) => {
      this.setState({
        data: results
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.data.length}
      </div>
    );
  }
}

export default TitleManagement;
