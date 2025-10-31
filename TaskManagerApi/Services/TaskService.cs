using TaskManagerApi.Models;

namespace TaskManagerApi.Services;

public class TaskService
{
    private readonly List<TaskItem> _tasks = [];
    private int _nextId = 1;

    public IEnumerable<TaskItem> GetAll() => _tasks;

    public TaskItem Add(TaskItem task)
    {
        task.Id = _nextId++;
        _tasks.Add(task);
        return task;
    }

    public bool Toggle(int id)
    {
        var task = _tasks.FirstOrDefault(t => t.Id == id);
        if (task == null) return false;
        task.IsCompleted = !task.IsCompleted;
        return true;
    }

    public bool Delete(int id)
    {
        var task = _tasks.FirstOrDefault(t => t.Id == id);
        if (task == null) return false;
        _tasks.Remove(task);
        return true;
    }
}
