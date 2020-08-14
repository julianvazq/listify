import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import { Helmet } from 'react-helmet';
import { RouteComponentProps } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Modal from '../shared/Modal/Modal';
import UserForm from './UserForm/UserForm';
import Members from './Members/Members';
import List from './List/List';
import LoadingState from './LoadingState/LoadingState';
import ErrorState from './ErrorState/ErrorState';

type LocationProps = { search: string };

type ErrorState = { error: string } | null;

export type Editing = { active: boolean; by: string; userId: string };

export type Item = {
  completed: boolean;
  editing?: Editing;
  item_id: string;
  item_name: string;
  last_edit_name: string;
  last_edit_id: string;
  list_id: string;
};

export type Member = {
  name: string;
};

/* Not used but show accurate return values from socket events
--------------------------------------------*/
type ErrorResponse = {
  error: string;
};

type SuccessResponse = {
  items: Item[];
  members: Member[];
  listName: string;
};
/* ------------------------------------------*/

const PageContainer = styled.div`
  max-width: 700px;
  min-height: 70vh;
  margin: 4rem 1rem;

  @media (min-width: 700px) {
    margin: 4rem auto;
  }
`;

const ListTitle = styled.h1`
  font-size: 2.5rem;
  color: var(--blue);
  display: inline-block;
  border-bottom: 3px solid var(--blue);
  padding-bottom: 0.5rem;
  margin-bottom: 2rem;
`;

const ListPage = ({ location }: RouteComponentProps<LocationProps>) => {
  const { socket, storedUser, addUserList } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { name, id, new: createList } = queryString.parse(location.search);
  const [listName, setListName] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [error, setError] = useState<ErrorState>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const deleteItem = (itemId: string) => {
    const updatedItems = items.filter((item) => item.item_id !== itemId);
    setItems(updatedItems);

    socket.emit('DELETE_ITEM', {
      listId: id,
      itemId,
    });
  };

  const addItem = (itemName: string) => {
    socket.emit('ADD_ITEM', {
      listId: id,
      itemName: itemName,
      user: storedUser,
      items,
    });
  };

  const updateURL = () => {
    window.history.replaceState(
      null,
      '',
      `${location.pathname}?name=${name}&id=${id}`
    );
  };

  useEffect(() => {
    if (!loading) {
      updateURL();
    }
  }, [loading]);

  useEffect(() => {
    setTimeout(() => {
      if (!storedUser.username) setModalVisible(true);
    }, 2000);
  }, []);

  useEffect(() => {
    /* Clear error */
    setError(null);
    setLoading(true);

    /* If URL does not have 'new' flag */
    if (createList === undefined) {
      socket.emit(
        'GET_LIST',
        {
          listId: id,
          listName: name,
          user: storedUser,
        },
        (res: any) => {
          // console.log('GET_LIST CALLBACK');
          if (res.error) {
            setError(res);
          }

          if (!storedUser.username) {
            setModalVisible(true);
          }

          setListName(res.listName);
          setItems(res.items || []);
          setMembers(res.members || []);
          setLoading(false);

          // console.log('FINISHED GETTING LIST');

          if (!res.error) {
            addUserList({ id, name: res.listName });
          }
        }
      );
    } else {
      socket.emit(
        'CREATE_LIST',
        {
          listId: id,
          listName: name,
          user: storedUser,
        },
        (res: any) => {
          // console.log('CREATE_LIST CALLBACK');
          if (res.error) {
            setError(res);
          }

          setListName(res.listName);
          setItems(res.items);
          setMembers(res.members);
          setLoading(false);

          addUserList({ id, name: res.listName });
        }
      );
    }

    socket.on('NEW_MEMBER', (newMembers: any) => {
      // console.log('NEW_MEMBER HANDLER');
      setMembers(newMembers);
    });

    socket.on('UPDATE_ITEMS', (updatedItems: any) => {
      // console.log('UPDATE_ITEM HANDLER');
      /* Turn edit state off for items the client itself is currently editing */
      const itemsFinal = updatedItems.map((item) => {
        if (item.editing && item.editing.id === storedUser.id) {
          return {
            ...item,
            editing: {
              active: false,
            },
          };
        }
        return item;
      });
      setItems(itemsFinal);
    });

    socket.on('EDITING', (editingItem: any) => {
      // console.log('EDITING HANDLER');
      /* Find the item being edited and replace it with new edits */
      setItems((prevItems) =>
        prevItems.map((item) => {
          if (item.item_id === editingItem.id) {
            return {
              ...item,
              item_name: editingItem.name,
              editing: editingItem.editing,
            };
          }
          return item;
        })
      );
    });

    return () => {
      socket.emit('disconnect');
    };

    /* Runs when URL changes and when new user saves their name */
    // eslint-disable-next-line
  }, [location.search, storedUser.username]);

  if (loading && !error) {
    return <LoadingState />;
  }

  if (!loading && error) {
    return <ErrorState message={error.error} />;
  }

  return (
    <PageContainer>
      <Helmet>
        <meta charSet='utf-8' />
        <title>{listName}</title>
        <link rel='canonical' href='http://mysite.com/example' />
      </Helmet>
      <ListTitle>{listName}</ListTitle>
      <Members members={members} />
      <List items={items} deleteItem={deleteItem} addItem={addItem} />
      <Modal
        modalVisible={modalVisible}
        onClose={() => {
          if (storedUser.username !== '') {
            setModalVisible(false);
          }
        }}
        height={160}
        showCloseButton={false}
      >
        <UserForm setModalVisible={setModalVisible} listId={id} />
      </Modal>
    </PageContainer>
  );
};

export default ListPage;
