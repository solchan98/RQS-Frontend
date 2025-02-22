import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useMemo } from 'react';
import { ITasksProps, TaskStatus } from '@/(1app)/(creationquiz)/index.types';
import { TasksStyles as styles } from '@/(1app)/(creationquiz)/components/Tasks/Tasks.styles';

const backgroundColorByStatus = {
  ADDED: 'blue',
  FINISH: 'red',
  PENDING_REVIEW: 'yellow',
  WAITING_TO_BE_PUBLISHED: 'green',
};
const textColorByStatus = {
  ADDED: 'white',
  FINISH: 'white',
  PENDING_REVIEW: 'black',
  WAITING_TO_BE_PUBLISHED: 'white',
};
const statusTextByStatus = {
  ADDED: '추가',
  FINISH: '종료',
  PENDING_REVIEW: '확인대기',
  WAITING_TO_BE_PUBLISHED: '발행대기',
};

const Tasks = ({ data, onPress }: ITasksProps) => {
  const taskStatusStats = useMemo(() => {
    const counts = data.reduce<Record<string, number>>((acc, task) => {
      acc[task.taskStatus] = (acc[task.taskStatus] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(statusTextByStatus).map((status) => ({
      status,
      count: counts[status] || 0,
    }));
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <View
        style={[styles.taskContainer, { padding: 12, justifyContent: 'center', alignItems: 'center', minHeight: 120 }]}
      >
        <Text>진행중인 작업이 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.taskContainer}>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        {taskStatusStats
          .filter((value) => value.count !== 0)
          .map((taskStatus) => (
            <Text key={taskStatus.status}>
              {statusTextByStatus[taskStatus.status as TaskStatus]} : {taskStatus.count}
            </Text>
          ))}
      </View>
      <ScrollView horizontal contentContainerStyle={{ gap: 12, padding: 12 }}>
        {data?.map((item) => (
          <TouchableOpacity
            onPress={() => onPress(item)}
            activeOpacity={0.6}
            key={item.taskId}
            style={styles.taskWrapper}
          >
            <View
              style={{
                backgroundColor: backgroundColorByStatus[item.taskStatus],
                width: 60,
                height: 24,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 9,
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: 'bold', color: textColorByStatus[item.taskStatus] }}>
                {statusTextByStatus[item.taskStatus]}
              </Text>
            </View>
            <Text style={{ fontWeight: 600 }} numberOfLines={1} ellipsizeMode='tail'>
              {item.quizPackTitle}
            </Text>
            <Text>작업 결과 : {item.taskResult}</Text>
            <Text>작업 시작 시간 : {item.createdAt.toString()}</Text>
            <Text>작업 종료 시간 : {item.updatedAt.toString()}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Tasks;
