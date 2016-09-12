import time

class Timing:
    def __init__(self):
        self.human_data = {}
        self.robot_data = {}
        self.human_task = "none"
        self.robot_task = "none"

    def start_task(self, agent, task_name):
        if(agent == "ROBOT"):
            self.robot_data[task_name] = {"start": [time.time()] , "end": []}
            self.robot_task = task_name
        else:
            if task_name in self.human_data:
                self.human_data[task_name]["start"].append(time.time())
            else:
                self.human_data[task_name] = {"start": [time.time()], "end":[]}
            self.human_task = task_name

    def get_current_task(self,agent):
        if(agent == "ROBOT"):
            return self.robot_task
        return self.human_task


    def end_task(self,agent, task_name):
        if(agent == "ROBOT"):
            self.robot_data[task_name]["end"].append(time.time())
            self.robot_task = "none"
        else:
            self.human_data[task_name]["end"].append( time.time())
            self.human_task = "none"

    def generate_report(self):
        for key in human_data:
            if key == 'none': 
                continue
            curr =  human_data[key]
            duration = 0
            for (idx, stamp) in enumerate(curr["start"]):
                duration += curr["end"][idx] - stamp 
            curr["duration"] = duration/len(curr["end"])
        return human_data 

