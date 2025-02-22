import React, { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useBlockCalender } from './useBlockCalender';
import { IBlockCalenderProps, ICellDateType } from './BlockCalender.types';
import { Colors } from '../../assets/colors';

const styles = StyleSheet.create({
  cell: {
    borderRadius: 4,
    height: 16,
    width: 16,
  },
  cellsColumn: {
    flexDirection: 'column',
    gap: 4,
  },
  columnContainer: {
    position: 'relative',
    width: 22,
  },
  columnLabel: {
    fontSize: 13,
    fontWeight: '500',
    height: 20,
    textAlign: 'center',
    width: 24,
  },
  container: {
    margin: 12,
  },
});

export const BlockCalender = ({ data }: IBlockCalenderProps) => {
  const { columnsState, getMonthName, getColor, isHover, mousePositionState, onEnterCellHandler, onLeaveCellHandler } =
    useBlockCalender(6);

  const scrollViewRef = useRef<ScrollView>(null); // ✅ ScrollView 참조 생성

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  const dateToKey = (date: ICellDateType) =>
    `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;

  const getCountByDate = (date: ICellDateType) => data.find((v) => v.localDate === `${dateToKey(date)}`)?.count ?? 0;

  return (
    <ScrollView ref={scrollViewRef} horizontal style={styles.container}>
      {columnsState.map((item) => (
        <View style={styles.columnContainer} key={item.columnIndex}>
          {item.showLabel ? (
            <Text style={styles.columnLabel}>{getMonthName(item.dates[0].month)}</Text>
          ) : (
            <Text style={styles.columnLabel} />
          )}
          <View style={styles.cellsColumn}>
            {item.dates.map((date) => (
              <TouchableOpacity
                style={[styles.cell, { backgroundColor: getColor(getCountByDate(date)) }]}
                key={dateToKey(date)}
                // TODO: onPressIn={(e) => onEnterCellHandler(e, dateToKey(date))}
                onPressIn={() => {}}
                // TODO: onPressOut={onLeaveCellHandler}
                onPressOut={() => {}}
              />
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};
