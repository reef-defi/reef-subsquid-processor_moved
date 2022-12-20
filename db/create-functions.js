class CreateFunctions {
  
  async up(db) {
    // Create functions
    await db.query(`
      CREATE FUNCTION public.account_count() RETURNS trigger
            LANGUAGE plpgsql
            AS $$BEGIN
        IF TG_OP = 'INSERT' THEN
          UPDATE chain_info SET count = count + 1 WHERE id = 'accounts';
          RETURN NEW;
        ELSIF TG_OP = 'DELETE' THEN
          UPDATE chain_info SET count = count - 1 WHERE id = 'accounts';
          RETURN OLD;
        ELSE
          UPDATE chain_info SET count = 0 WHERE id = 'accounts';
          RETURN NULL;
        END IF;
      END;$$;
      CREATE FUNCTION public.block_count() RETURNS trigger
          LANGUAGE plpgsql
          AS $$BEGIN
        IF TG_OP = 'INSERT' THEN
          UPDATE chain_info SET count = count + 1 WHERE id = 'blocks';
          RETURN NEW;
        ELSIF TG_OP = 'DELETE' THEN
          UPDATE chain_info SET count = count - 1 WHERE id = 'blocks';
          RETURN OLD;
        ELSE
          UPDATE chain_info SET count = 0 WHERE id = 'blocks';
          RETURN NULL;
        END IF;
      END;$$;
      CREATE FUNCTION public.contract_count() RETURNS trigger
          LANGUAGE plpgsql
          AS $$BEGIN
        IF TG_OP = 'INSERT' THEN
          UPDATE chain_info SET count = count + 1 WHERE id = 'contracts';
          RETURN NEW;
        ELSIF TG_OP = 'DELETE' THEN
          UPDATE chain_info SET count = count - 1 WHERE id = 'contracts';
          RETURN OLD;
        ELSE
          UPDATE chain_info SET count = 0 WHERE id = 'contracts';
          RETURN NULL;
        END IF;
      END;$$;
      CREATE FUNCTION public.event_count() RETURNS trigger
          LANGUAGE plpgsql
          AS $$BEGIN
        IF TG_OP = 'INSERT' THEN
          UPDATE chain_info SET count = count + 1 WHERE id = 'events';
          RETURN NEW;
        ELSIF TG_OP = 'DELETE' THEN
          UPDATE chain_info SET count = count - 1 WHERE id = 'events';
          RETURN OLD;
        ELSE
          UPDATE chain_info SET count = 0 WHERE id = 'events';
          RETURN NULL;
        END IF;
      END;$$;
      CREATE FUNCTION public.extrinsic_count() RETURNS trigger
          LANGUAGE plpgsql
          AS $$BEGIN
        IF TG_OP = 'INSERT' THEN
          UPDATE chain_info SET count = count + 1 WHERE id = 'extrinsics';
          RETURN NEW;
        ELSIF TG_OP = 'DELETE' THEN
          UPDATE chain_info SET count = count - 1 WHERE id = 'extrinsics';
          RETURN OLD;
        ELSE
          UPDATE chain_info SET count = 0 WHERE id = 'extrinsics';
          RETURN NULL;
        END IF;
      END;$$;
      CREATE FUNCTION public.new_verified_contract_found() RETURNS trigger
          LANGUAGE plpgsql
          AS $$
      BEGIN
        INSERT INTO newly_verified_contract_queue (id) VALUES (NEW.id);
        RETURN NEW;
      END;
      $$;
      CREATE FUNCTION public.transfer_count() RETURNS trigger
          LANGUAGE plpgsql
          AS $$BEGIN
        IF TG_OP = 'INSERT' THEN
          UPDATE chain_info SET count = count + 1 WHERE id = 'transfers';
          RETURN NEW;
        ELSIF TG_OP = 'DELETE' THEN
          UPDATE chain_info SET count = count - 1 WHERE id = 'transfers';
          RETURN OLD;
        ELSE
          UPDATE chain_info SET count = 0 WHERE id = 'transfers';
          RETURN NULL;
        END IF;
      END;$$;
    `)
    // Create triggers
    await db.query(`
      CREATE CONSTRAINT TRIGGER account_count_mod AFTER INSERT OR DELETE ON public.account DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION public.account_count();
      CREATE TRIGGER account_count_trunc AFTER TRUNCATE ON public.account FOR EACH STATEMENT EXECUTE FUNCTION public.account_count();
      CREATE CONSTRAINT TRIGGER block_count_mod AFTER INSERT OR DELETE ON public.block DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION public.block_count();
      CREATE TRIGGER block_count_trunc AFTER TRUNCATE ON public.block FOR EACH STATEMENT EXECUTE FUNCTION public.block_count();
      CREATE CONSTRAINT TRIGGER contract_count_mod AFTER INSERT OR DELETE ON public.contract DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION public.contract_count();
      CREATE TRIGGER contract_count_trunc AFTER TRUNCATE ON public.contract FOR EACH STATEMENT EXECUTE FUNCTION public.contract_count();
      CREATE CONSTRAINT TRIGGER event_count_mod AFTER INSERT OR DELETE ON public.event DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION public.event_count();
      CREATE TRIGGER event_count_trunc AFTER TRUNCATE ON public.event FOR EACH STATEMENT EXECUTE FUNCTION public.event_count();
      CREATE CONSTRAINT TRIGGER extrinsic_count_mod AFTER INSERT OR DELETE ON public.extrinsic DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION public.extrinsic_count();
      CREATE TRIGGER extrinsic_count_trunc AFTER TRUNCATE ON public.extrinsic FOR EACH STATEMENT EXECUTE FUNCTION public.extrinsic_count();
      CREATE CONSTRAINT TRIGGER transfer_count_mod AFTER INSERT OR DELETE ON public.transfer DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION public.transfer_count();
      CREATE TRIGGER transfer_count_trunc AFTER TRUNCATE ON public.transfer FOR EACH STATEMENT EXECUTE FUNCTION public.transfer_count();
      CREATE TRIGGER verified_contract_found AFTER INSERT ON public.verified_contract FOR EACH ROW EXECUTE FUNCTION public.new_verified_contract_found();
    `)
  }
}