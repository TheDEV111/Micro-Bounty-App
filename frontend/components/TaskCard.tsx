import { motion } from 'framer-motion';
import { Clock, DollarSign, User } from 'lucide-react';
import Link from 'next/link';

interface TaskCardProps {
  id: number;
  title: string;
  description: string;
  reward: number;
  deadline: string;
  category: string;
  status: string;
  creator: string;
}

const statusColors = {
  open: 'bg-green-100 text-green-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  completed: 'bg-gray-100 text-gray-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function TaskCard({
  id,
  title,
  description,
  reward,
  deadline,
  category,
  status,
  creator,
}: TaskCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-semibold text-brand-500 bg-brand-50 px-3 py-1 rounded-full">
          {category}
        </span>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[status as keyof typeof statusColors]}`}>
          {status}
        </span>
      </div>

      <Link href={`/tasks/${id}`}>
        <h3 className="text-lg font-bold text-gray-800 mb-2 hover:text-brand-500 transition-colors cursor-pointer">
          {title}
        </h3>
      </Link>

      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {description}
      </p>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <DollarSign size={16} />
          <span className="font-bold text-brand-500">{reward} STX</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={16} />
          <span>{deadline}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <User size={14} />
          <span>{creator}</span>
        </div>
        <Link href={`/tasks/${id}`}>
          <button className="px-4 py-2 bg-brand-500 text-white rounded-lg font-semibold text-sm hover:bg-brand-600 transition-all">
            View Details
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
