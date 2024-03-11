import PieGraph from "@/features/questions/components/PieGraph";
import { PIE_LABELS } from "@/features/questions/constants";

const HomeWorkProgressPies = ({
  ratio,
  ratio_vfx,
}: {
  ratio: number;
  ratio_vfx: number;
}) => {
  return (
    <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2">
      <PieGraph label={PIE_LABELS.homework} ratio={ratio} />
      <PieGraph
        label={PIE_LABELS.vfx}
        ratio={ratio_vfx}
        strokeColor="stroke-purple-600"
      />
    </div>
  );
};

export default HomeWorkProgressPies;
