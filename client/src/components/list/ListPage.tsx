import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import io from 'socket.io-client';
import { RouteComponentProps } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import CreateButton from '../home/CreateButton/CreateButton';
import Modal from '../shared/Modal/Modal';
import UserForm from './UserForm/UserForm';

type LocationProps = { search: string };

type ErrorState = { error: string } | null;

type Item = {
  item_id: string;
  item_name: string;
  created_by: string;
};

type Member = {
  name: string;
};

let socket;
socket = io('localhost:4000');

const ListPage = ({ location }: RouteComponentProps<LocationProps>) => {
  const { storedUser, setStoredUser, addUserList } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [listName, setListName] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [error, setError] = useState<ErrorState>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { name, id, new: createList } = queryString.parse(location.search);

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
          console.log('GET_LIST CALLBACK');
          if (res.error) {
            setError(res);
          }

          if (!storedUser.username) {
            setModalVisible(true);
          }

          setListName(res.listName);
          setItems(res.items);
          setMembers(res.members);
          setLoading(false);
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
          console.log('CREATE_LIST CALLBACK');
          if (res.error) {
            setError(res);
          }

          setListName(res.listName);
          setMembers(res.members);
          setLoading(false);
        }
      );
    }

    socket.on('NEW_MEMBER', (newMembers: any) => {
      console.log('NEW_MEMBER ALL');
      console.log({ newMembers });
      setMembers(newMembers);
    });

    return () => {
      socket.emit('disconnect');

      socket.off();
    };

    /* Runs when URL changes and when new user saves their name */
    // }, [location.search, storedUser.username]);
  }, [location.search, storedUser.username]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!loading && error) {
    return (
      <>
        <h1>{error.error}</h1>
        <CreateButton />
      </>
    );
  }

  /* If list name is not set after coming 
  back from server then it doesn't exist */
  if (!loading && !listName) {
    return (
      <>
        <h1>This list does not seem to exist.</h1>
        <CreateButton />
      </>
    );
  }

  return (
    <div>
      <h1>{listName}</h1>
      <h2>LIST PAGE</h2>
      Members:{' '}
      {members.map((member, index) => (
        <p key={index}>
          {index}. {member.name}
        </p>
      ))}
      <ul>
        {items.map((item) => (
          <li key={item.item_id}>{item.item_name}</li>
        ))}
      </ul>
      <Modal
        modalVisible={modalVisible}
        onClose={() => {
          setStoredUser({ ...storedUser, username: 'Anonymous' });
          setModalVisible(false);
        }}
      >
        <UserForm
          setModalVisible={setModalVisible}
          socket={socket}
          listId={id}
        />
      </Modal>
    </div>
  );
};

export default ListPage;
