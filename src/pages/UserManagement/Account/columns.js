module.exports = [
  {
    title: "User Name",
    dataIndex: "user_name",
    key: "user_name",
    align: "center",
    editable: true,
    sorter: (a, b) => a.user_name.length - b.user_name.length,
    sortDirections: ["ascend", "descend"]
  },
  {
    title: "Email",
    dataIndex: "email",
    align: "center",
    key: "email",
    sorter: (a, b) => a.email.length - b.Email.length,
    sortDirections: ["descend", "ascend"],
    editable: true
  },
  {
    title: "Phone",
    dataIndex: "phone_no",
    align: "center",
    key: "phone_no",
    sorter: (a, b) => a.phone_no.length - b.phone_no.length,
    sortDirections: ["descend", "ascend"],
    editable: true
  },
  {
    title: "Role",
    dataIndex: "role",
    align: "center",
    key: "role",
    editable: true
  }
];
