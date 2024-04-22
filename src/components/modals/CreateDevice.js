import React, { useContext, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { DeviceStoreContext } from "../..";
import Dropdown from "react-bootstrap/esm/Dropdown";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/esm/Col";
import { createDevice, fetchBrands, fetchTypes } from "../../http/deviceApi";
import { observer } from "mobx-react-lite";

const CreateDevice = observer(({show, onHide}) =>{
    const {device} = useContext(DeviceStoreContext)
    const [info, setInfo] = useState([]);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);

    // загрузка устройств з сервера
    useEffect(() => {
        // в deviceStore поміщаєм те що прийшло з сервера
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
    }, [])

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addInfo = () =>{
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) =>{
        setInfo(info.filter(i => i.number !== number))
    }

    // для options
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }
    // отправка devict на сервер
    const addDevice = () => {
        const formData = new FormData()
        // можна додати або строку або блоб (набор битов(`${price}`))
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(info))

        createDevice(formData).then(data => onHide())
    } 

    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                {/* <Modal.Body> */}
                {/* </Modal.Body> */}
                    <Form.Group style={{padding: 15}}>
                        <Dropdown>
                            <DropdownToggle>{device.selectedType.name || "Вибрати тип"}</DropdownToggle>
                            <DropdownMenu>
                                {device.types.map(type => 
                                    <DropdownItem 
                                        key={type.id}
                                        onClick={() => device.setSelectedType(type)}
                                    >{type.name}</DropdownItem>
                                )}
                            </DropdownMenu>
                        </Dropdown>

                        <Dropdown>
                            <DropdownToggle>{device.selectedBrand.name || "Вибрати бренд"}</DropdownToggle>
                            <DropdownMenu>
                                {device.brands.map(brand => 
                                    <DropdownItem 
                                        key={brand.id}
                                        onClick={() => device.setSelectedBrand(brand)}
                                    >{brand.name}</DropdownItem>
                                )}
                            </DropdownMenu>
                        </Dropdown>

                        <Form.Control
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Назва:"
                        />
                        <Form.Control
                            value={price}
                            onChange={e => setPrice(Number(e.target.value))}
                            placeholder="Ціна"
                            type="number"
                        />
                        <Form.Control
                            placeholder="Картинка:"
                            type="file"
                            onChange={selectFile}
                        />

                        <hr/>

                        <Button
                            variant={'outline-dark'}
                            onClick={addInfo}
                        >
                            Добавити нову властивість
                        </Button>
                        {info.map(i => 
                                <Row className="mt-3" key={i.number}>
                                    <Col md={4}>
                                        <Form.Control
                                            value={i.title}
                                            onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                            placeholder="Назва властивості"
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Form.Control
                                            value={i.description}
                                            onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                            placeholder="Значення властивості"
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Button 
                                            variant={'outline-danger'}
                                            onClick={() => removeInfo(i.number)}
                                        >
                                        Видалити
                                        </Button>
                                    </Col>
                                </Row>
                            
                            )
                        }


                    </Form.Group>
                <Modal.Footer> 
                    <Button variant="secondary" onClick={onHide}>Закрити</Button>
                    <Button variant="primary" onClick={addDevice}>Додати</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
});

export default CreateDevice;