import React, { useEffect, useState } from "react";
import MEDitor from "@uiw/react-md-editor";

import { useMutation, useQuery } from "@apollo/client";
import { CONTENT_ID } from "apollo/querys/contents";
import { useParams } from "react-router-dom";

import { CREATE_CONTENT } from "apollo/Mutations/content";
import { MODULES } from "apollo/querys/modules";
import { InputLabel, MenuItem, Select } from "@material-ui/core";

const ContentDetail = () => {
  const [createMutation, resultCreate] = useMutation(CREATE_CONTENT);
  const [readme, setReadme] = React.useState("Hola");
  const [values, setValues] = useState({
    topicName: "",
    durationTime: 0,
    moduleId: 0,
  });

  const modules = useQuery(MODULES);

  const { topicName, durationTime, moduleId } = values;

  const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  const { id } = useParams();

  const variables = {
    id: id && parseInt(id),
  };

  const { data } = useQuery(CONTENT_ID, { variables });

  useEffect(() => {
    if (data && data) {
      setReadme(data.contents[0].readme);
    }
  }, [data]);

  const handleCreate = (e) => {
    e.preventDefault();
    console.log(values);
    createMutation({
      variables: {
        ...values,
        durationTime: parseInt(values.durationTime),
        moduleId: parseInt(values.moduleId),
        readme,
      },
    });
  };

  return (
    <div className="container" onSubmit={handleCreate}>
      <MEDitor height={800} value={readme} onChange={setReadme} />
      <div style={{ padding: "50px 0 0 0" }} />

      <form action="">
        <label>TopicName</label>
        <input
          type="text"
          name="topicName"
          value={topicName}
          onChange={handleInputChange}
        />
        <label>Duración</label>
        <input
          placeholder="Duracion"
          type="text"
          name="durationTime"
          value={durationTime}
          onChange={handleInputChange}
        />
        <InputLabel id="Modulo">Modulos</InputLabel>
        <Select
          labelId="label"
          id="select"
          value={values.moduleId}
          onChange={handleInputChange}
        >
          {modules.data?.modules.map((module) => (
            <MenuItem key={module.id} value={module.id}>
              {module.name}
            </MenuItem>
          ))}
        </Select>

        <button type="submit">Crear</button>
      </form>

      {/* VISTA PREVIA DEL MARKDONW */}

      {/* <MEDitor.Markdown source={value} /> */}

      {/* REPRODUCTOR CLASE GLABADA */}
    </div>
  );
};

export default ContentDetail;
