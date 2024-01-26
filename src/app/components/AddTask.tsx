"use client";
import { addTodo } from "../pages/api";
import { formatDate, formatTime } from "./Todo";
import React, { ChangeEvent, FormEvent, useState } from 'react';
import {v4 as uuidv4} from "uuid";
import { ChakraProvider, Box, Flex, Radio, RadioGroup, Stack, Input, FormControl, FormLabel, Button} from '@chakra-ui/react';


const AddTask = () => {
    const [taskTitle, setTaskTitle] = useState("");
    //const [deadlineDate, setDeadlineDate] = useState<Date>(new Date());
    const [deadlineDate, setDeadlineDate] = useState("");
    const [deadlineTime, setDeadlineTime] = useState("");

    const [submissionFormat, setSubmissionFormat] = React.useState("PDF");
    const [otherFormat, setOtherFormat] = useState("");

    // ハンドラー関数
    //const handleFormatChange = (value: string) => {
    //    setSubmissionFormat(value);
    //    if (value !== 'other') {
    //        setOtherFormat('');
    //    }
    //};

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        let formatValue = submissionFormat;
        if ( submissionFormat === 'other') {
            formatValue = otherFormat;
        }

        const newTask ={ 
            id: uuidv4(),
            text: taskTitle,
            date: deadlineDate,
            time: deadlineTime,
            format: formatValue        }; 

        await addTodo (newTask);     
        //setTaskTitle("");
        ////setDeadlineDate(new Date());
        //setDeadlineDate("");
        //setDeadlineTime("");
        //setSubmissionFormat("PDF");
        //setOtherFormat("");
    };
    
 return (
    <ChakraProvider>
        <Box as="form" onSubmit={handleSubmit} p={4} borderWidth = "5px" borderRadius="lg" overflow="hidden"className="mb-4 space-y-3">
            <Flex gap = "3">
                <FormControl flex = "1">
                    <Input 
                        placeholder="タスク名"
                        type="text" 
                        value={taskTitle}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.target.value)}
                        style = {{ width: '190px' ,borderRadius: '10px' }}
                    />
                </FormControl>
                <FormControl flex = "1">
                    <Input 
                        type="date" 
                        value={deadlineDate}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setDeadlineDate(e.target.value)}
                    />
                </FormControl>
                <FormControl flex = "1">
                    <Input 
                        type="time" 
                        value={deadlineTime}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setDeadlineTime(e.target.value)}
                        style = {{ width: '90px' ,borderRadius: '10px' }}
                    />
                </FormControl>
            </Flex>
            <Flex alignItems="center" justifyContent="center">
            <FormControl as="fieldset">
                <RadioGroup onChange={setSubmissionFormat} value={submissionFormat} mb = {1}>
                    <Stack direction="row">
                        <Radio value="PDF">PDF</Radio>
                        <Radio value="Word">Word</Radio>
                        <Radio value="txt">txt</Radio>
                        <Radio value="Other">その他</Radio>
                    </Stack>
                </RadioGroup>
                {submissionFormat === 'Other' && (
                    <Input 
                        placeholder="提出形式を入力してください" 
                        value={otherFormat}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setOtherFormat(e.target.value)}
                        style = {{ width: '240px' ,borderRadius: '10px' }}
                    />
                )}
            </FormControl>
            <Button mt={4} colorScheme="teal" type="submit" width = "200px">Add Task</Button>
            </Flex>
        </Box>
    </ChakraProvider>
    );
};

export default AddTask;

