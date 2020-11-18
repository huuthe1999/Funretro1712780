import React, { useState, useEffect } from 'react'
import { CssBaseline } from '@material-ui/core'
import NarBar from '../Header/NarBar';
import { makeStyles } from '@material-ui/core/styles';
import { isAuthUser, getCookie } from '../../helper/authUser';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import MenuBoardDetail from './MenuBoardDetail';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import BoardColumn from './BoardColumn';
import Task from './Task';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '30px 40px',
    },
}))

const colorColumns = ['#8e24aa', '#2196f3', '#009688'];

export default function BoardDetail({ match }) {
    const classes = useStyles();
    const [form, setForm] = useState({
        _id: '',
        content_context: '',
        name: '',
        column_header: [],
    });

    const { _id, content_context, name, column_header } = form;

    useEffect(() => {
        const token = getCookie('token');
        axios.get(`/api/board/${isAuthUser()._id}/${match.params.idBoard}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            const response = res.data.resultBoard;
            setForm({
                _id: response._id,
                content_context: response.content_context,
                name: response.name,
                column_header: response.column_header,
            });
        }).catch(err => {
            toast.error('Không thể load Board');
        });
    }, [match.params.idBoard])

    const handleEditName = (data) => {
        const updateBoard = {
            nameBoard: data.nameBoard,
        };
        const token = getCookie('token');
        axios.put(`/api/board/update/${_id}/name`,
            {
                ...updateBoard
            }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            setForm({ ...form, name: data.nameBoard });
            toast.success('Cập nhật tên Board thành công');
        }).catch(err => {
            toast.error('Không thể load Board');
        });
    }

    const handleEditContent = (data) => {
        const token = getCookie('token');
        axios.put(`/api/board/update/${_id}/content`,
            {
                content_context: data.content_context
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                setForm({ ...form, content_context: data.content_context });
                toast.success('Cập nhật nội dung Board thành công');
            }).catch(err => {
                toast.error('Không thể load Board');
            });
    }

    const handleEditNameColumn = (data) => {
        const token = getCookie('token');
        axios.put(`/api/column/update/${_id}/nameColumn/?columnType=${data.type}`,
            {
                nameColumn: data.columnNameHeader
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                const response = res.data.resultBoard;
                setForm(response);
                toast.success('Cập nhật tên Column Board thành công');
            }).catch(err => {
                toast.error('Không thể cập nhật Column Board');
                // toast.error(err.response.data.error);
            });
    }

    const handleAddTask = (data) => {
        const token = getCookie('token');
        axios.post(`/api/column/task/add/${_id}/?columnType=${data.type}`,
            {
                content: data.content
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                const response = res.data.resultBoard;
                setForm({
                    ...form, column_header: response.column_header
                });
                toast.success('Thêm Task thành công');
            }).catch(err => {
                toast.error('Không thể cập nhật Column Board');
                // toast.error(err.response.data.error);
            });
    }

    const handleEditTask = (data) => {
        const token = getCookie('token');
        axios.put(`/api/column/task/update/${_id}/?columnType=${data.type}&idTask=${data._id}`,
            {
                nameTask: data.contentTask
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                const response = res.data.resultBoard;
                setForm({
                    ...form, column_header: response.column_header, editedTaskId: null,
                });
                toast.success('Chỉnh sửa Task thành công');
            }).catch(err => {
                toast.error('Không thể cập nhật tên Task');
            });
    }

    const handleDeleteTask = (data) => {

        const token = getCookie('token');
        axios.delete(`/api/column/task/delete/${_id}/?columnType=${data.type}&idTask=${data._id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            const response = res.data.resultBoard;
            setForm({
                ...form, column_header: response.column_header
            });
            toast.success('Xóa Task thành công');
        }).catch(err => toast.error('Xóa Task thất bại'));

    }

    const handleChangeDrag = (result) => {
        const { source, destination, reason } = result;
        const temp = column_header;
        if (reason === 'DROP' && destination) {
            const sourceColumnIndex = (temp.filter(column =>
                column._id === source.droppableId
            ))[0];

            const taskContent = temp[sourceColumnIndex.type].comment[source.index];
            temp[sourceColumnIndex.type].comment.splice(source.index, 1);

            const destinationColumnIndex = (temp.filter(column =>
                column._id === destination.droppableId
            ))[0];

            temp[destinationColumnIndex.type].comment.splice(destination.index, 0, taskContent);

            setForm({ ...form, column_header: temp })

            const token = getCookie('token');
            axios.put(`/api/board/update/${_id}/column`,
                {
                    column_header: column_header
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => {
                    const response = res.data.resultBoard;
                    setForm({ ...form, content_context: response.content_context });
                    toast.success('Kéo thả Task thành công');
                }).catch(err => {
                    toast.error('Không thể load Board');
                });

        }
    }
    return (
        <React.Fragment>
            <CssBaseline />
            <NarBar />
            {name ? <MenuBoardDetail
                name={name}
                contentContext={content_context}
                handleEditName={handleEditName}
                handleEditContent={handleEditContent}
            /> : null}
            <DragDropContext onDragEnd={handleChangeDrag}>
                <Container maxWidth="xl" className={classes.root}>
                    <Grid container spacing={4}>
                        {column_header.map((item, index) => (
                            <BoardColumn
                                handleEditNameColumn={handleEditNameColumn}
                                handleAddTask={handleAddTask}
                                key={item.type}
                                listContentTask={column_header[index].comment}
                                column={item} >
                                <Droppable droppableId={item._id}>
                                    {
                                        provided => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}>

                                                {column_header[index].comment && column_header[index].comment.map((task, taskIndex) => (
                                                    <Task
                                                        columnIndex={index}
                                                        taskIndex={taskIndex}
                                                        handleEditTask={handleEditTask}
                                                        handleDeleteTask={handleDeleteTask}
                                                        colorBackground={colorColumns[index]}
                                                        key={task._id}
                                                        content={task} />
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )
                                    }
                                </Droppable>
                            </BoardColumn>
                        ))}
                    </Grid>
                </Container>
            </DragDropContext>
        </React.Fragment>
    )
}
