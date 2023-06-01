import { CSVLink } from "react-csv";

interface UserData {
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
}

interface Props {
  dataList: UserData[];
}

const DownloadCSV: React.FC<Props> = ({ dataList }) => {
  return (
    <div>
      <CSVLink
        data={dataList}
        separator={","}
        filename={"CSVFile"}
        target="_blank"
        enclosingCharacter={``}
      >
        Download CSV
      </CSVLink>
    </div>
  );
};

export default DownloadCSV;
