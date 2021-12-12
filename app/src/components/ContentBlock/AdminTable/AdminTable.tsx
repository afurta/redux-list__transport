import React, {useEffect, useRef, useState, FormEvent} from 'react';
import './AdminTable.css'
import { IUserTableItem} from '../../../Interface'


const AdminTable:React.FC = () => {
    const [updateBtn, setUpdateBtn] = useState<boolean>(false);
    const [form, setForm] = useState<boolean>(false);
    const [data, setData] = useState<Array<IUserTableItem>>([]);
    const [updateId, setId] = useState<string>();

    const classesForm: string[] = [];
    const classesTable: string[] = [];


    const inpNumber = useRef<HTMLInputElement>(null);
    const inpDate = useRef<HTMLInputElement>(null);
    const inpFirmName = useRef<HTMLInputElement>(null);
    const inpDriver = useRef<HTMLInputElement>(null);
    const inpPhone = useRef<HTMLInputElement>(null);
    const inpComment = useRef<HTMLInputElement>(null);
    const inpAti = useRef<HTMLInputElement>(null);

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

    const deleteHandler = async (event: React.MouseEvent<HTMLTableDataCellElement>) => {
        const { id } = (event.target as HTMLTableDataCellElement).dataset;
        try {
            await fetch(`https://yeticrab-8c7cf-default-rtdb.firebaseio.com/drivers/${id}.json`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            getFirebaseData()
        }catch (e) {
            console.log(e)
        }
    };

    const showForm = () => {
        setUpdateBtn(false)
        setForm(true);
        inpNumber.current!.value = "";
        inpDate.current!.value = "";
        inpFirmName.current!.value = "";
        inpDriver.current!.value = "";
        inpPhone.current!.value = "";
        inpComment.current!.value = "";
        inpAti.current!.value = "";
    };

    const closeForm = () => {
        setForm(false);
        // setUpdate(false);
        // setData(arrData);
        // setUpdateBtn(false);
    };

    const sendUpdateData = async () => {
        let newObj: IUserTableItem = {
            number: inpNumber.current!.value,
            date: inpDate.current!.value,
            firmName: inpFirmName.current!.value,
            driver: inpDriver.current!.value,
            phone: inpPhone.current!.value,
            comment: inpComment.current!.value,
            ati: inpAti.current!.value,
        };
        try {
            await fetch(`https://yeticrab-8c7cf-default-rtdb.firebaseio.com/drivers/${updateId}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newObj)
            });
            getFirebaseData()
        } catch (e) {
            console.log(e);
        }
    };

    const editHandler = async (
        event: React.MouseEvent<HTMLTableDataCellElement>
    ) => {
        const { id } = (event.target as HTMLTableDataCellElement).dataset;
        setId(id);
        setUpdateBtn(true);
        try {
            await fetch(`https://yeticrab-8c7cf-default-rtdb.firebaseio.com/drivers/${id}.json`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(data => {
                return data.json()
            })
                .then(data => {
                    inpDate.current!.value = data.date;
                    inpNumber.current!.value = data.number;
                    inpFirmName.current!.value = data.firmName;
                    inpDriver.current!.value = data.driver;
                    inpPhone.current!.value = data.phone;
                    inpComment.current!.value = data.comment;
                    inpAti.current!.value = data.ati;
                });

            setForm(!form);
        } catch (e) {
            console.log(e);
        }
    };

    const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
        setForm(true);
        setUpdateBtn(false);
        event.preventDefault();
        const { number, date, firmName, driver, phone, comment, ati } =
            event.target as typeof event.target & {
                number: { value: number };
                date: { value: Date };
                firmName: { value: string };
                driver: { value: string };
                phone: { value: number };
                comment: { value: string };
                ati: { value: any };
            };
        let person = {
            number: number.value,
            date: date.value,
            firmName: firmName.value,
            driver: driver.value,
            phone: phone.value,
            comment: comment.value,
            ati: ati.value,
        };

        try {
            await fetch("https://yeticrab-8c7cf-default-rtdb.firebaseio.com/drivers.json", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(person)
            });
            getFirebaseData()
        } catch (e) {
            console.log(e);
        }
    };





    return (
        <>
        <div style={{ display: "none" }}>
            {!form
                ? (classesForm.push("form_hide"), classesTable.push("table_show"))
                : (classesForm.push("form"), classesTable.push("table_hide"))
            }
        </div>
        <table className={classesTable.join(" ")}>
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
                <th colSpan={2}>Управление</th>
            </tr>
            </thead>
            <tbody>

            {data.map((elem, index) => {
                return (
                    <tr key={elem.id}>
                        <td>{elem.number}</td>
                        <td>{elem.date}</td>
                        <td>{elem.firmName}</td>
                        <td>{elem.number}</td>
                        <td>{elem.number}</td>
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
                        <td className="thBtn btnEdit">
                            <i
                                className="material-icons"
                                onClick={editHandler}
                                data-id={elem.id}
                            >
                                edit
                            </i>
                        </td>
                        <td className="thBtn btnDelete">
                            <i
                                className="material-icons"
                                data-id={elem.id}
                                onClick={deleteHandler}
                            >
                                delete
                            </i>
                        </td>
                    </tr>
                );
            })}
            <tr className="defaulTr">
                <td colSpan={9}>
                    <div className="btnAdd"
                         onClick={showForm}
                    >
                        <i className="material-icons medium">add</i>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    <form
        action=""
        className={classesForm.join(" ")}
        onSubmit={onSubmitHandler}
    >
        <div className="closeForm"
             onClick={closeForm}
        >
            <i className=" medium material-icons">close</i>
        </div>
        <h2>Новая задача</h2>
        <label>
            Номер заявки
            <input type="text" name="number" required
                   ref={inpNumber}
            />
        </label>
        <label>
            Дата и время получения заявки от клиента
            <input type="date" name="date" required
                   ref={inpDate}
            />
        </label>
        <label>
            Название фирмы клиента
            <input type="text" name="firmName" required
                   ref={inpFirmName}
            />
        </label>
        <label>
            ФИО перевозчика
            <input type="text" name="driver" required
                   ref={inpDriver}
            />
        </label>
        <label>
            Контактный телефон перевозчика
            <input
                type="text"
                name="phone"
                pattern="[+]{1}[7-9]{1}[0-9]{10}"
                title="Пример +71112223344"
                placeholder="Пример +71112223344"
                required
                ref={inpPhone}
            />
        </label>
        <label>
            Комментарии
            <input type="text" name="comment" required
                   ref={inpComment}
            />
        </label>
        <label>
            ATI
            <input
                name="ati"
                pattern="^[ 0-9]+$"
                title="Пример 1234"
                placeholder="Пример 1234"
                required
                ref={inpAti}
            />
        </label>

        {updateBtn ? (
            <button
                className="btn waves-effect waves-light"
                type="button"
                name="action"
                onClick={sendUpdateData}
            >
                Обновить
                <i className="material-icons right">send</i>
            </button>
        ) : (
            <button
                className="btn waves-effect waves-light"
                type="submit"
                name="action"
            >
                Отправить
                <i className="material-icons right">send</i>
            </button>
        )}
    </form>
</>
    );
};

export default AdminTable;