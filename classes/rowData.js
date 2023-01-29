class RowData {
  id;
  label;
  isDone;

  constructor(rowData={}) {
      this.id = rowData.id || null;
      this.label = rowData.label || '';
      this.isDone = rowData.isDone || false;
  }
}

export default RowData;
