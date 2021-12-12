import React, {useEffect, useState} from 'react';
import './UserTable.css'
import { IUserTableItem} from "../../../Interface";



const UserTable:React.FC = () => {
    const [data, setData] = useState<Array<IUserTableItem>>([]);

    useEffect(() => {
        getFirebaseData()
    }, []);

    function getFirebaseData(){
        const dataFirebase:Array<IUserTableItem> = [];
        fetch('https://yeticrab-8c7cf-default-rtdb.firebaseio.com/drivers.json')
            .then((response) => {
                return response.json();
            }).then((data) => {
            for(let key in data){
                dataFirebase.push({...data[key], id: key})
            }
            setData(dataFirebase)
        });
    }

    return (
        <table>
            <thead>
            <tr>
                <th colSpan={2}>Всего заявок</th>
                <th>{data.length}</th>
            </tr>
            <tr>
                <th>Номер заявки</th>
                <th>Дата и время получения заявки от клиента</th>
                <th>Название фирмы клиента</th>
                <th>ФИО перевозчика</th>
                <th>Контактный телефон перевозчика</th>
                <th>Комментарии</th>
                <th>ATI</th>
            </tr>
            </thead>
            <tbody>
            {data.map(elem => {
                return (
                    <tr key={elem.id}>
                        <td>{elem.number}</td>
                        <td>{elem.date}</td>
                        <td>{elem.firmName}</td>
                        <td>{elem.driver}</td>
                        <td>{elem.phone}</td>
                        <td>{elem.comment}</td>
                        <td>
                            <a
                                href={`https://ati.su/firms/${elem.ati}/info`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {elem.ati}
                            </a>
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
};

export default UserTable;