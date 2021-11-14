import { useState } from 'react';
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';
import { Button, Grid } from 'semantic-ui-react';
import { globalState } from 'types';
import { useSelector } from 'react-redux';
import { getAnio } from 'utils/fechas';
import { Input, Dimmer, Loader, } from 'semantic-ui-react';
import { getHistoryAll } from 'api';
import { getFechaString, getMes } from 'utils/fechas';

function History() {

    const data = useSelector((state: globalState) => state.data);

    const [chart, setChart] = useState<any>(data)
    const [value, setValue] = useState<number>(getAnio());
    const [loading, setLoading] = useState<boolean>(false);


    function soloNumeros(e: any) {
        if (e.target.value.length <= 4) {
            setValue(e.target.value);
        }
    }

    async function onSubmit() {
        setLoading(true);
        var tempData = [];
        for (let i = 0; i < 12; i++) {
            const { data } = await getHistoryAll({ fechai: getFechaString(i + 1, 1, value), fechaf: getFechaString(i + 1, 30, value) });
            let temp = {
                "name": getMes(i),
                "uv": data.length,
            };
            tempData.push(temp);
        }
        setChart(tempData);
        setLoading(false);
    }
    return (
        <div>
            <Dimmer active={loading}>
                <Loader size='massive'>Loading</Loader>
            </Dimmer>
            <Grid centered>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <Input
                            name='date'
                            type='number'
                            value={value}
                            defaultValue={value}
                            icon='calendar alternate outline'
                            maxLength={4}
                            onChange={soloNumeros}
                        />
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Button
                            fluid
                            color="orange"
                            circular
                            onClick={onSubmit}
                        >
                            Consultar
                        </Button>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <AreaChart width={1130} height={250} data={chart}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                        <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                    </AreaChart>
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default History
