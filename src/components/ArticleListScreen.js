import React, {Component} from 'react';
import NavBar from './NavBar';
import styled from 'styled-components';
import { Table } from 'semantic-ui-react';

const mockData = [
  {
    articleId: '-LB1',
    author: '장재훈',
    title: '야호야호야ㅗ햐오햐오햐오햐오햐',
    createdAt: '2018-01-20'
  },
  {
    articleId: '-LB2',
    author: '훈재장',
    title: 'title2',
    createdAt: '2018-01-22'
  }
]

const ArticleItemRow = styled(Table.Row)`
  &:hover {
    background-color: orange;
    cursor: pointer;
  }
`;

export default class ArticleListScreen extends Component {
  render() {
    const {nickName, onNickNameClick} = this.props;
    return (
      <div>
        <NavBar nickName={nickName} onNickNameClick={onNickNameClick} />
        <Table padded='very'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>작성자</Table.HeaderCell>
              <Table.HeaderCell>제목</Table.HeaderCell>
              <Table.HeaderCell>작성일</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              mockData.map(({ articleId, title, author, createdAt }) => (
                <ArticleItemRow key={articleId}>
                  <Table.Cell>{author}</Table.Cell>
                  <Table.Cell>{title}</Table.Cell>
                  <Table.Cell>{createdAt}</Table.Cell>
                </ArticleItemRow>
              ))
            }
          </Table.Body>
        </Table>
      </div>
    )
  }
}
