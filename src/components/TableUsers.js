import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import _ from 'lodash';
import ModalConfirm from './ModalConfirm';
import './TableUser.scss';
// import {debounce} from "lodash";

const TableUsers = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({})
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataUserDelete, setDataUserDelete] = useState({})

    const [sortBy, setSortBy] = useState('asc');
    const [sortField, setSortField] = useState('id');

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false);
        setIsShowModalDelete(false);
    }

    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers])
    }

    useEffect(() => {
        // call apis
        getUsers(1);
    }, [])

    const getUsers = async (page) => {
        let res = await fetchAllUser(page);
        if (res && res.data) {
            console.log(res)
            setTotalUsers(res.total)
            setTotalPages(res.total_pages)
            setListUsers(res.data)
        }
    }

    const handlePageClick = (event) => {
        getUsers(+event.selected + 1);
    }

    const handleEditUser = (user) => {
        setDataUserEdit(user);
        setIsShowModalEdit(true);
    }

    const handleEditUserFromModal = (user) => {
        let cloneListusers = _.cloneDeep(listUsers);
        let index = listUsers.findIndex(item => item.id === user.id);
        console.log('>> ck user: ', user)
        cloneListusers[index].first_name = user.first_name;
        setListUsers(cloneListusers);
        console.log(listUsers, cloneListusers)
        console.log('>>>check index: ', index);
    }

    const handleDeleteUser = (user) => {
        setIsShowModalDelete(true);
        setDataUserDelete(user);
    }

    const handleDeleteUserFromModal = (user) => {
        let cloneListusers = _.cloneDeep(listUsers);
        cloneListusers = cloneListusers.filter(item => item.id !== user.id);
        setListUsers(cloneListusers);
    }

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);
        let cloneListusers = _.cloneDeep(listUsers);
        cloneListusers = _.orderBy(cloneListusers, [sortField], [sortBy]);
        setListUsers(cloneListusers);
    }

    const handleSearch = _.debounce((event) => {
        let term = event.target.value;
        console.log('term', term);
        let cloneListusers = _.cloneDeep(listUsers);
        cloneListusers = cloneListusers.filter(item => item.email.includes(term));
        console.log(cloneListusers)
        setListUsers(cloneListusers);
    }, 500)

    return (
        <>
            <div className='my-3 add-new d-flex justify-content-between'>
                <span><h3>List Users:</h3></span>
                <button className='btn btn-success'
                    onClick={() => setIsShowModalAddNew(true)}
                >
                    Add new user
                </button>
            </div>
            <div className='col-4 my-3'>
                <input type='text'
                    placeholder='Search users by email ...'
                    onChange={(event) => handleSearch(event)}
                />
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>
                            <div className='sort-header'>
                                <span>ID</span>
                                <span>
                                    <i className="fa-solid fa-arrow-up-a-z"
                                        onClick={() => handleSort('asc', 'id')}
                                    ></i>
                                    <i className="fa-solid fa-arrow-down-z-a"
                                        onClick={() => handleSort('desc', 'id')}
                                    ></i>
                                </span>
                            </div>
                        </th>
                        <th>Email</th>
                        <th>
                            <div className='sort-header'>
                                <span>First Name</span>
                                <span>
                                    <i className="fa-solid fa-arrow-up-a-z"
                                        onClick={() => handleSort('asc', 'first_name')}
                                    ></i>
                                    <i className="fa-solid fa-arrow-down-z-a"
                                        onClick={() => handleSort('desc', 'first_name')}
                                    ></i>
                                </span>
                            </div>
                        </th>
                        <th>Last Name</th>
                        <th>Avatar</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr key={`users-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td><img src={item.avatar} /></td>
                                    <td>
                                        <button className='btn btn-warning mx-3'
                                            onClick={() => handleEditUser(item)}
                                        >Edit</button>
                                        <button className='btn btn-danger'
                                            onClick={() => handleDeleteUser(item)}
                                        >Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </Table>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"
                renderOnZeroPageCount={null}

                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
            <ModalAddNew
                show={isShowModalAddNew}
                handleClose={handleClose}
                handleUpdateTable={handleUpdateTable}
            />

            <ModalEditUser
                show={isShowModalEdit}
                handleClose={handleClose}
                dataUserEdit={dataUserEdit}
                handleUpdateTable={handleUpdateTable}
                handleEditUserFromModal={handleEditUserFromModal}
            />

            <ModalConfirm
                show={isShowModalDelete}
                handleClose={handleClose}
                dataUserDelete={dataUserDelete}
                handleDeleteUserFromModal={handleDeleteUserFromModal}
            />


        </>)
}

export default TableUsers;