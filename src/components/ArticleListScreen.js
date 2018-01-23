import React, {Component} from 'react';
import NavBar from './NavBar';
import styled from 'styled-components';
import { Table } from 'semantic-ui-react';


const ArticleItemRow = styled(Table.Row)`
  &:hover {
    background-color: orange;
    cursor: pointer;
  }
`;

export default class ArticleListScreen extends Component {
  render() {
    const {nickName, onNickNameClick, articleArr} = this.props;
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
              Array.isArray(articleArr) && articleArr.length > 0
                ? articleArr.map(({ articleId, title, author, createdAt }) => (
                  <ArticleItemRow key={articleId}>
                    <Table.Cell>{author}</Table.Cell>
                    <Table.Cell>{title}</Table.Cell>
                    <Table.Cell>{createdAt}</Table.Cell>
                  </ArticleItemRow>
                ))
                : '게시글이 없습니다.'

            }
          </Table.Body>
        </Table>
      </div>
    )
  }
}
