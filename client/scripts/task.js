const getCurrentTaskId = () => {
  const url = new URL(location.href);
  const taskId = url.searchParams.get("taskId");
  return taskId;
};
