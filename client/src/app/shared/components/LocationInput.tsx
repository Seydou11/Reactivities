import { Box, debounce, List, ListItemButton, TextField, Typography } from "@mui/material";
import { useController, type FieldValues, type UseControllerProps } from "react-hook-form";
import type { LocationIQSuggestion } from "../../../lib/types";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

type Props<T extends FieldValues> = {
    label: string
} & UseControllerProps<T>

export default function LocationInput<T extends FieldValues>(props: Props<T>) {
    const {field, fieldState} = useController({...props});
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<LocationIQSuggestion[]>([]);
    const [inputValue, setInputValue] = useState(field.value || '');

    useEffect(() => {
        if (field.value && typeof field.value === 'object') {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setInputValue(field.value.venue || '');
        } else {
            setInputValue(field.value || '');
        }
    }, [field.value]);

    const locationUrl = `https://api.locationiq.com/v1/autocomplete?key=pk.c87c112ad4e2d421e004fed3a96b2649&limit=5&dedupe=1&`;

    const fecthSuggestions = useMemo(() => debounce(async (query: string) => {
        if (!query || query.length < 3) {
            setSuggestions([]);
            return;

        }
        setLoading(true);

        try {
            const response = await axios.get<LocationIQSuggestion[]>(`${locationUrl}q=${query}`);
            setSuggestions(response.data);
        } catch(error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, 500), [locationUrl]);

    const handleChange = async (value: string) => {
        field.onChange(value);
        await fecthSuggestions(value);
    }

    const handleSelect = (location: LocationIQSuggestion) => {
        const city = location.address?.city || location.address?.town || location.address?.village || '';
        const venue = location.display_name || '';
        const latitude = location.lat;
        const longitude = location.lon;

        setInputValue(venue);
        field.onChange({ venue, city, latitude, longitude });
        setSuggestions([]);
        
    };

  return (
    <Box>
        <TextField
            {...props}
            value={inputValue}
            onChange={(e) => handleChange(e.target.value)}
            variant="outlined"
            fullWidth
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
        />
        {loading && <Typography>Loading...</Typography>}
        {suggestions.length > 0 && (
            <List sx={{border: 1}}>
                {suggestions.map((suggestion) => (
                    <ListItemButton 
                        divider
                        key={suggestion.place_id}
                        onClick={() => handleSelect(suggestion)}
                    >
                        {suggestion.display_name}
                    </ListItemButton>
                ))}
            </List>
        )}
    </Box>
  )
}