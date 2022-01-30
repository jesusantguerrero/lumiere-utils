import { AuthState } from "lumiere-utils/useAuth"

export function useCollection(supabase) {  
    const collectionConfig = {
        userField: 'user_id',
        idField: 'id',
        select: '*',
        parser: row => row
    }
    
    const save = async (tableName, rows, defaultConfig = collectionConfig) => {
        const config = { ...collectionConfig, ...defaultConfig };
        const { data, error } = await supabase
        .from(tableName)
        .insert(rows.map(row => ({
            ...row,
            [config.userField]: AuthState.user.id, 
            
        })));
        
        if (error) throw error;
        return data;
    }

    const update = async (tableName, row, defaultConfig = collectionConfig) => {
        const config = { ...collectionConfig, ...defaultConfig };
        const { data, error } = await supabase
        .from(tableName)
        .update(row, { returning: "representation", ...config })
        .eq(config.idField, row[config.idField])
        
        if (error) throw error;
        return data;
    }

    const destroy = async (tableName, resourceId) => {
        return await supabase.from(tableName).delete().eq('id', resourceId);    
    }

    const getOne = async (tableName, uid, defaultConfig = collectionConfig) => {
        const config = { ...collectionConfig, ...defaultConfig };
        const { data, error } = await supabase.from(tableName)
        .select(config.select)
        .eq(config.idField, uid)
        .eq(config.userField, AuthState.user.id);
        if (error) throw error;
        return data?.map(config.parser);
    }

    const getAll = async (tableName, defaultConfig = collectionConfig) => {
        const config = { ...collectionConfig, ...defaultConfig };
        const { data, error } = await supabase.from(tableName)
        .select(config.select)
        .eq(config.userField, AuthState.user.id);
        if (error) throw error;
        return data?.map(config.parser);
    }

    return {
        save,
        update,
        destroy,
        getOne,
        getAll,
    }
}
