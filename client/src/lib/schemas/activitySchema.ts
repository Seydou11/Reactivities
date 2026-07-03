import {z} from 'zod'
import { requiredString } from '../util/util';

export const activitySchema = z.object({
    title: requiredString('Title'),
    description: requiredString('Description'),
    category: requiredString('Category'),
    date: z.coerce.date({ error: 'Date is required' }),
    location: z.object({
        venue: requiredString('Venue'),
        city: z.string().optional(),
        latitude: z.coerce.number().optional(),
        longitude: z.coerce.number().optional()
    }),
})

export type ActivitySchema = z.infer<typeof activitySchema>;
